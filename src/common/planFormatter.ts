import type { PlanItem, AttributeDiff, PlanDisplayConfig } from '../types';
import { diffAttributes } from './hashUtils';
import { lang } from '../lang';
import { logger } from './logger';

const COLOR = {
  RESET: '\x1b[0m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  RED: '\x1b[31m',
  CYAN: '\x1b[36m',
  DIM: '\x1b[2m',
};

const COMPUTED_ATTRIBUTES = new Set([
  'codeHash',
  'functionId',
  'functionArn',
  'createdTime',
  'lastModifiedTime',
  'status',
  'invokeUrl',
  'invokeArn',
  'arn',
  'id',
]);

const DEFAULT_CONFIG: PlanDisplayConfig = {
  colorize: true,
  indentSize: 4,
  keyAlignWidth: 12,
  showUnchangedAttributes: false,
  maxUnchangedHidden: 5,
};

const isObject = (val: unknown): boolean =>
  typeof val === 'object' && val !== null && !Array.isArray(val);

const isSimpleObject = (val: unknown): boolean => {
  if (!isObject(val)) return false;
  const obj = val as Record<string, unknown>;
  return Object.values(obj).every((v) => typeof v !== 'object' || v === null);
};

export const computeAttributeDiffs = (
  before: Record<string, unknown> | undefined,
  after: Record<string, unknown> | undefined,
): { diffs: AttributeDiff[]; unchangedCount: number } => {
  if (!before && !after) return { diffs: [], unchangedCount: 0 };

  if (!before && after) {
    return {
      diffs: Object.entries(after)
        .map(([key, value]) => ({
          key,
          after: value,
          action: 'add' as const,
          isComputed: COMPUTED_ATTRIBUTES.has(key),
          children:
            isObject(value) && !isSimpleObject(value)
              ? computeAttributeDiffs(undefined, value as Record<string, unknown>).diffs
              : undefined,
        }))
        .sort((a, b) => a.key.localeCompare(b.key)),
      unchangedCount: 0,
    };
  }

  if (before && !after) {
    return {
      diffs: Object.entries(before)
        .map(([key, value]) => ({
          key,
          before: value,
          action: 'remove' as const,
          isComputed: COMPUTED_ATTRIBUTES.has(key),
          children:
            isObject(value) && !isSimpleObject(value)
              ? computeAttributeDiffs(value as Record<string, unknown>, undefined).diffs
              : undefined,
        }))
        .sort((a, b) => a.key.localeCompare(b.key)),
      unchangedCount: 0,
    };
  }

  const { changed, added, removed } = diffAttributes(before!, after!);
  const allKeys = new Set([...Object.keys(before!), ...Object.keys(after!)]);
  const unchangedCount =
    allKeys.size -
    Object.keys(changed).length -
    Object.keys(added).length -
    Object.keys(removed).length;

  const addDiffs: AttributeDiff[] = Object.entries(added).map(([key, value]) => ({
    key,
    after: value,
    action: 'add',
    isComputed: COMPUTED_ATTRIBUTES.has(key),
    children:
      isObject(value) && !isSimpleObject(value)
        ? computeAttributeDiffs(undefined, value as Record<string, unknown>).diffs
        : undefined,
  }));

  const removeDiffs: AttributeDiff[] = Object.entries(removed).map(([key, value]) => ({
    key,
    before: value,
    action: 'remove',
    isComputed: COMPUTED_ATTRIBUTES.has(key),
    children:
      isObject(value) && !isSimpleObject(value)
        ? computeAttributeDiffs(value as Record<string, unknown>, undefined).diffs
        : undefined,
  }));

  const changeDiffs: AttributeDiff[] = Object.entries(changed).map(
    ([key, { before: oldVal, after: newVal }]) => {
      const bothObjects = isObject(oldVal) && isObject(newVal);
      return {
        key,
        before: oldVal,
        after: newVal,
        action: 'change',
        children: bothObjects
          ? computeAttributeDiffs(
              oldVal as Record<string, unknown>,
              newVal as Record<string, unknown>,
            ).diffs
          : undefined,
      };
    },
  );

  const diffs = [...addDiffs, ...removeDiffs, ...changeDiffs].sort((a, b) =>
    a.key.localeCompare(b.key),
  );
  return { diffs, unchangedCount };
};

const colorize = (text: string, color: keyof typeof COLOR, enabled: boolean): string =>
  enabled ? `${COLOR[color]}${text}${COLOR.RESET}` : text;

const formatValue = (value: unknown): string => {
  if (typeof value === 'string') return `"${value}"`;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (value === null || value === undefined) return 'null';
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    return `[${value.map((v) => formatValue(v)).join(', ')}]`;
  }
  if (isSimpleObject(value)) {
    const entries = Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => `${k}: ${formatValue(v)}`)
      .join(', ');
    return `{ ${entries} }`;
  }
  return JSON.stringify(value);
};

const computeMaxKeyWidth = (diffs: AttributeDiff[], baseIndent: number): number =>
  diffs.reduce((maxWidth, diff) => {
    const keyWidth = diff.key.length + 1;
    const childWidth =
      diff.children && diff.children.length > 0
        ? computeMaxKeyWidth(diff.children, baseIndent + 4)
        : 0;
    return Math.max(maxWidth, keyWidth, childWidth);
  }, 0);

const formatAttributeLines = (
  diff: AttributeDiff,
  indent: number,
  config: PlanDisplayConfig,
  keyWidth: number,
): string[] => {
  const spaces = ' '.repeat(indent);
  const alignedKey = (diff.key + ':').padEnd(keyWidth);

  switch (diff.action) {
    case 'add': {
      if (diff.children && diff.children.length > 0) {
        const childKeyWidth = computeMaxKeyWidth(diff.children, indent);
        return [
          colorize(`${spaces}${alignedKey}`, 'GREEN', config.colorize),
          ...diff.children.flatMap((child) =>
            formatAttributeLines(child, indent + config.indentSize, config, childKeyWidth),
          ),
        ];
      }
      const value = diff.isComputed
        ? colorize(lang.__('PLAN_COMPUTED_VALUE'), 'CYAN', config.colorize)
        : formatValue(diff.after);
      return [colorize(`${spaces}${alignedKey} ${value}`, 'GREEN', config.colorize)];
    }

    case 'remove': {
      if (diff.children && diff.children.length > 0) {
        const childKeyWidth = computeMaxKeyWidth(diff.children, indent);
        return [
          colorize(`${spaces}${alignedKey}`, 'RED', config.colorize),
          ...diff.children.flatMap((child) =>
            formatAttributeLines(child, indent + config.indentSize, config, childKeyWidth),
          ),
        ];
      }
      return [
        colorize(`${spaces}${alignedKey} ${formatValue(diff.before)}`, 'RED', config.colorize),
      ];
    }

    case 'change': {
      if (diff.children && diff.children.length > 0) {
        const childKeyWidth = computeMaxKeyWidth(diff.children, indent);
        return [
          colorize(`${spaces}${alignedKey}`, 'YELLOW', config.colorize),
          ...diff.children.flatMap((child) =>
            formatAttributeLines(child, indent + config.indentSize, config, childKeyWidth),
          ),
        ];
      }
      const beforeStr = formatValue(diff.before);
      const afterStr = formatValue(diff.after);
      return [
        colorize(`${spaces}${alignedKey} ${beforeStr} -> ${afterStr}`, 'YELLOW', config.colorize),
      ];
    }
  }
};

const ACTION_DESC: Record<string, string> = {
  create: 'PLAN_WILL_CREATE',
  update: 'PLAN_WILL_UPDATE',
  delete: 'PLAN_WILL_DESTROY',
  noop: 'PLAN_NO_CHANGES',
  refresh: 'PLAN_WILL_REFRESH',
};

const ACTION_SYMBOL: Record<string, string> = {
  create: '+',
  update: '~',
  delete: '-',
  refresh: '↻',
};

const ACTION_COLOR: Record<string, keyof typeof COLOR> = {
  create: 'GREEN',
  update: 'YELLOW',
  delete: 'RED',
  refresh: 'CYAN',
};

export const formatPlanItem = (
  item: PlanItem,
  config: PlanDisplayConfig = DEFAULT_CONFIG,
): string => {
  const descKey = ACTION_DESC[item.action] ?? 'PLAN_NO_CHANGES';
  const headerLine = `  # ${item.logicalId} ${lang.__(descKey as keyof typeof ACTION_DESC)}`;

  if (item.action === 'noop') {
    return headerLine;
  }

  const symbol = ACTION_SYMBOL[item.action] ?? ' ';
  const symbolColor = ACTION_COLOR[item.action] ?? 'RESET';
  const resourceLine = colorize(`  ${symbol} ${item.logicalId}:`, symbolColor, config.colorize);

  if (!item.changes) {
    return [headerLine, resourceLine].join('\n');
  }

  const { diffs, unchangedCount } = computeAttributeDiffs(item.changes.before, item.changes.after);
  const keyWidth = Math.max(config.keyAlignWidth, computeMaxKeyWidth(diffs, config.indentSize));

  const attrLines =
    diffs.length > 0
      ? diffs.flatMap((diff) => formatAttributeLines(diff, config.indentSize, config, keyWidth))
      : [];

  const hiddenLine =
    unchangedCount > 0 && !config.showUnchangedAttributes
      ? [
          colorize(
            `      # ${lang.__('PLAN_UNCHANGED_ATTRS', { count: String(unchangedCount) })}`,
            'DIM',
            config.colorize,
          ),
        ]
      : [];

  return [headerLine, resourceLine, ...attrLines, ...hiddenLine].join('\n');
};

export const formatPlan = (
  items: PlanItem[],
  config: PlanDisplayConfig = DEFAULT_CONFIG,
): string => {
  if (items.length === 0) {
    return lang.__('NO_CHANGES_INFRASTRUCTURE_UP_TO_DATE');
  }

  const createItems = items.filter((i) => i.action === 'create');
  const updateItems = items.filter((i) => i.action === 'update');
  const deleteItems = items.filter((i) => i.action === 'delete');
  const refreshItems = items.filter((i) => i.action === 'refresh');
  const noopItems = items.filter((i) => i.action === 'noop');

  const actionItems = [
    ...createItems,
    ...updateItems,
    ...deleteItems,
    ...refreshItems,
    ...noopItems,
  ];

  const header = [
    `${lang.__('PLAN_HEADER')}\n`,
    colorize(lang.__('PLAN_LEGEND_CREATE'), 'GREEN', config.colorize),
    colorize(lang.__('PLAN_LEGEND_UPDATE'), 'YELLOW', config.colorize),
    colorize(lang.__('PLAN_LEGEND_DESTROY'), 'RED', config.colorize),
    '',
  ];

  const itemLines = actionItems.flatMap((item) => [formatPlanItem(item, config), '']);

  const summary = lang.__('PLAN_SUMMARY', {
    createCount: String(createItems.length),
    updateCount: String(updateItems.length),
    deleteCount: String(deleteItems.length),
  });

  return [...header, ...itemLines, summary].join('\n');
};

export const displayPlan = (planResult: { items: PlanItem[] }): void => {
  const output = formatPlan(planResult.items);
  logger.info(output);
};
