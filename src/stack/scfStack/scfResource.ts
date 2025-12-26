import { Context, FunctionDomain, ResourceState } from '../../types';
import { ScfProvider } from './scfProvider';
import { computeConfigHash, functionToScfConfig } from './scfTypes';
import { StateManager } from '../../common/stateManager';

export class ScfResource {
  private provider: ScfProvider;
  private stateManager: StateManager;

  constructor(
    private readonly context: Context,
    stateManager: StateManager,
  ) {
    this.provider = new ScfProvider(context);
    this.stateManager = stateManager;
  }

  async create(fn: FunctionDomain): Promise<void> {
    const config = functionToScfConfig(fn);
    const codePath = fn.code!.path;

    await this.provider.createFunction(config, codePath);

    const configHash = computeConfigHash(config);
    const resourceState: ResourceState = {
      type: 'SCF',
      physicalId: fn.name,
      region: this.context.region,
      configHash,
      lastUpdated: new Date().toISOString(),
    };

    const logicalId = `functions.${fn.key}`;
    this.stateManager.set(logicalId, resourceState);
  }

  async read(functionName: string) {
    return await this.provider.getFunction(functionName);
  }

  async refresh(fn: FunctionDomain): Promise<boolean> {
    const remoteFunction = await this.provider.getFunction(fn.name);
    if (!remoteFunction) {
      return false;
    }

    const config = functionToScfConfig(fn);
    const localConfigHash = computeConfigHash(config);

    const logicalId = `functions.${fn.key}`;
    const currentState = this.stateManager.get(logicalId);

    // Check if there's drift
    if (currentState && currentState.configHash !== localConfigHash) {
      return true; // Drifted
    }

    return false; // No drift
  }

  async update(fn: FunctionDomain): Promise<void> {
    const config = functionToScfConfig(fn);
    const codePath = fn.code!.path;

    // Update configuration
    await this.provider.updateFunctionConfiguration(config);

    // Update code
    await this.provider.updateFunctionCode(fn.name, codePath);

    const configHash = computeConfigHash(config);
    const resourceState: ResourceState = {
      type: 'SCF',
      physicalId: fn.name,
      region: this.context.region,
      configHash,
      lastUpdated: new Date().toISOString(),
    };

    const logicalId = `functions.${fn.key}`;
    this.stateManager.set(logicalId, resourceState);
  }

  async delete(functionName: string, logicalId: string): Promise<void> {
    await this.provider.deleteFunction(functionName);
    this.stateManager.remove(logicalId);
  }
}
