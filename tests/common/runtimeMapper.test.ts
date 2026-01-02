import {
  mapRuntime,
  isRuntimeSupported,
  getSupportedRuntimes,
  StandardRuntime,
} from '../../src/common/runtimeMapper';
import { ProviderEnum } from '../../src/common/providerEnum';

describe('runtimeMapper', () => {
  describe('mapRuntime', () => {
    describe('nodejs runtimes', () => {
      it('maps nodejs24 to AWS nodejs24.x', () => {
        expect(mapRuntime(StandardRuntime.NODEJS24, ProviderEnum.AWS)).toBe('nodejs24.x');
      });

      it('maps nodejs22 to AWS nodejs22.x', () => {
        expect(mapRuntime(StandardRuntime.NODEJS22, ProviderEnum.AWS)).toBe('nodejs22.x');
      });

      it('maps nodejs20 to Aliyun nodejs20', () => {
        expect(mapRuntime(StandardRuntime.NODEJS20, ProviderEnum.ALIYUN)).toBe('nodejs20');
      });

      it('maps nodejs20 to AWS nodejs20.x', () => {
        expect(mapRuntime(StandardRuntime.NODEJS20, ProviderEnum.AWS)).toBe('nodejs20.x');
      });

      it('maps nodejs18 to Aliyun nodejs18', () => {
        expect(mapRuntime(StandardRuntime.NODEJS18, ProviderEnum.ALIYUN)).toBe('nodejs18');
      });

      it('maps nodejs18 to Tencent Nodejs18.15', () => {
        expect(mapRuntime(StandardRuntime.NODEJS18, ProviderEnum.TENCENT)).toBe('Nodejs18.15');
      });

      it('maps nodejs16 to Aliyun nodejs16', () => {
        expect(mapRuntime(StandardRuntime.NODEJS16, ProviderEnum.ALIYUN)).toBe('nodejs16');
      });

      it('maps nodejs16 to Tencent Nodejs16.13', () => {
        expect(mapRuntime(StandardRuntime.NODEJS16, ProviderEnum.TENCENT)).toBe('Nodejs16.13');
      });

      it('maps nodejs14 to Aliyun nodejs14', () => {
        expect(mapRuntime(StandardRuntime.NODEJS14, ProviderEnum.ALIYUN)).toBe('nodejs14');
      });

      it('maps nodejs14 to Tencent Nodejs14.18', () => {
        expect(mapRuntime(StandardRuntime.NODEJS14, ProviderEnum.TENCENT)).toBe('Nodejs14.18');
      });

      it('maps nodejs12 to Aliyun nodejs12', () => {
        expect(mapRuntime(StandardRuntime.NODEJS12, ProviderEnum.ALIYUN)).toBe('nodejs12');
      });

      it('maps nodejs12 to Tencent Nodejs12.16', () => {
        expect(mapRuntime(StandardRuntime.NODEJS12, ProviderEnum.TENCENT)).toBe('Nodejs12.16');
      });

      it('maps nodejs10 to Aliyun nodejs10', () => {
        expect(mapRuntime(StandardRuntime.NODEJS10, ProviderEnum.ALIYUN)).toBe('nodejs10');
      });

      it('maps nodejs10 to Tencent Nodejs10.15', () => {
        expect(mapRuntime(StandardRuntime.NODEJS10, ProviderEnum.TENCENT)).toBe('Nodejs10.15');
      });
    });

    describe('python runtimes', () => {
      it('maps python3.14 to AWS python3.14', () => {
        expect(mapRuntime(StandardRuntime.PYTHON3_14, ProviderEnum.AWS)).toBe('python3.14');
      });

      it('maps python3.13 to AWS python3.13', () => {
        expect(mapRuntime(StandardRuntime.PYTHON3_13, ProviderEnum.AWS)).toBe('python3.13');
      });

      it('maps python3.12 to Aliyun python3.12', () => {
        expect(mapRuntime(StandardRuntime.PYTHON3_12, ProviderEnum.ALIYUN)).toBe('python3.12');
      });

      it('maps python3.12 to AWS python3.12', () => {
        expect(mapRuntime(StandardRuntime.PYTHON3_12, ProviderEnum.AWS)).toBe('python3.12');
      });

      it('maps python3.11 to AWS python3.11', () => {
        expect(mapRuntime(StandardRuntime.PYTHON3_11, ProviderEnum.AWS)).toBe('python3.11');
      });

      it('maps python3.10 to Aliyun python3.10', () => {
        expect(mapRuntime(StandardRuntime.PYTHON3_10, ProviderEnum.ALIYUN)).toBe('python3.10');
      });

      it('maps python3.10 to Tencent Python3.10', () => {
        expect(mapRuntime(StandardRuntime.PYTHON3_10, ProviderEnum.TENCENT)).toBe('Python3.10');
      });

      it('maps python3.10 to AWS python3.10', () => {
        expect(mapRuntime(StandardRuntime.PYTHON3_10, ProviderEnum.AWS)).toBe('python3.10');
      });

      it('maps python3.9 to Aliyun python3.9', () => {
        expect(mapRuntime(StandardRuntime.PYTHON3_9, ProviderEnum.ALIYUN)).toBe('python3.9');
      });

      it('maps python3.9 to Tencent Python3.9', () => {
        expect(mapRuntime(StandardRuntime.PYTHON3_9, ProviderEnum.TENCENT)).toBe('Python3.9');
      });

      it('maps python3.7 to Tencent Python3.7', () => {
        expect(mapRuntime(StandardRuntime.PYTHON3_7, ProviderEnum.TENCENT)).toBe('Python3.7');
      });

      it('maps python3.6 to Aliyun python3.6', () => {
        expect(mapRuntime(StandardRuntime.PYTHON3_6, ProviderEnum.ALIYUN)).toBe('python3.6');
      });

      it('maps python3.6 to Tencent Python3.6', () => {
        expect(mapRuntime(StandardRuntime.PYTHON3_6, ProviderEnum.TENCENT)).toBe('Python3.6');
      });
    });

    describe('java runtimes', () => {
      it('maps java25 to AWS java25', () => {
        expect(mapRuntime(StandardRuntime.JAVA25, ProviderEnum.AWS)).toBe('java25');
      });

      it('maps java21 to AWS java21', () => {
        expect(mapRuntime(StandardRuntime.JAVA21, ProviderEnum.AWS)).toBe('java21');
      });

      it('maps java17 to AWS java17', () => {
        expect(mapRuntime(StandardRuntime.JAVA17, ProviderEnum.AWS)).toBe('java17');
      });

      it('maps java11 to Aliyun java11', () => {
        expect(mapRuntime(StandardRuntime.JAVA11, ProviderEnum.ALIYUN)).toBe('java11');
      });

      it('maps java11 to AWS java11', () => {
        expect(mapRuntime(StandardRuntime.JAVA11, ProviderEnum.AWS)).toBe('java11');
      });

      it('maps java8 to Aliyun java8', () => {
        expect(mapRuntime(StandardRuntime.JAVA8, ProviderEnum.ALIYUN)).toBe('java8');
      });

      it('maps java8 to Tencent Java8', () => {
        expect(mapRuntime(StandardRuntime.JAVA8, ProviderEnum.TENCENT)).toBe('Java8');
      });

      it('maps java8 to AWS java8.al2', () => {
        expect(mapRuntime(StandardRuntime.JAVA8, ProviderEnum.AWS)).toBe('java8.al2');
      });
    });

    describe('php runtimes', () => {
      it('maps php8.0 to Tencent Php8.0', () => {
        expect(mapRuntime(StandardRuntime.PHP8_0, ProviderEnum.TENCENT)).toBe('Php8.0');
      });

      it('maps php7.4 to Tencent Php7.4', () => {
        expect(mapRuntime(StandardRuntime.PHP7_4, ProviderEnum.TENCENT)).toBe('Php7.4');
      });

      it('maps php7.2 to Aliyun php7.2', () => {
        expect(mapRuntime(StandardRuntime.PHP7_2, ProviderEnum.ALIYUN)).toBe('php7.2');
      });

      it('maps php7.2 to Tencent Php7.2', () => {
        expect(mapRuntime(StandardRuntime.PHP7_2, ProviderEnum.TENCENT)).toBe('Php7.2');
      });

      it('maps php5.6 to Tencent Php5.6', () => {
        expect(mapRuntime(StandardRuntime.PHP5_6, ProviderEnum.TENCENT)).toBe('Php5.6');
      });
    });

    describe('go runtimes', () => {
      it('maps go1 to Aliyun go 1.x', () => {
        expect(mapRuntime(StandardRuntime.GO1, ProviderEnum.ALIYUN)).toBe('go 1.x');
      });

      it('maps go1 to Tencent Go1', () => {
        expect(mapRuntime(StandardRuntime.GO1, ProviderEnum.TENCENT)).toBe('Go1');
      });
    });

    describe('dotnet runtimes', () => {
      it('maps dotnet_core3.1 to Aliyun .NET Core 3.1', () => {
        expect(mapRuntime(StandardRuntime.DOTNET_CORE3_1, ProviderEnum.ALIYUN)).toBe(
          '.NET Core 3.1',
        );
      });
    });

    describe('error handling', () => {
      it('throws error for unsupported runtime', () => {
        expect(() => mapRuntime('invalid_runtime', ProviderEnum.ALIYUN)).toThrow(
          'Unsupported standard runtime: invalid_runtime',
        );
      });

      it('throws error when runtime not supported by provider', () => {
        expect(() => mapRuntime(StandardRuntime.NODEJS24, ProviderEnum.ALIYUN)).toThrow(
          'Runtime nodejs24 is not supported for provider aliyun',
        );
      });

      it('throws error when runtime not supported by Tencent', () => {
        expect(() => mapRuntime(StandardRuntime.NODEJS20, ProviderEnum.TENCENT)).toThrow(
          'Runtime nodejs20 is not supported for provider tencent',
        );
      });

      it('includes available providers in error message', () => {
        expect(() => mapRuntime(StandardRuntime.NODEJS24, ProviderEnum.ALIYUN)).toThrow(
          'Supported providers for this runtime: aws',
        );
      });
    });
  });

  describe('isRuntimeSupported', () => {
    it('returns true when runtime is supported by provider', () => {
      expect(isRuntimeSupported(StandardRuntime.NODEJS18, ProviderEnum.ALIYUN)).toBe(true);
      expect(isRuntimeSupported(StandardRuntime.NODEJS18, ProviderEnum.TENCENT)).toBe(true);
    });

    it('returns false when runtime is not supported by provider', () => {
      expect(isRuntimeSupported(StandardRuntime.NODEJS24, ProviderEnum.ALIYUN)).toBe(false);
      expect(isRuntimeSupported(StandardRuntime.NODEJS20, ProviderEnum.TENCENT)).toBe(false);
    });

    it('returns false for invalid runtime', () => {
      expect(isRuntimeSupported('invalid_runtime', ProviderEnum.ALIYUN)).toBe(false);
    });

    it('verifies python3.10 is supported by all three providers', () => {
      expect(isRuntimeSupported(StandardRuntime.PYTHON3_10, ProviderEnum.ALIYUN)).toBe(true);
      expect(isRuntimeSupported(StandardRuntime.PYTHON3_10, ProviderEnum.TENCENT)).toBe(true);
      expect(isRuntimeSupported(StandardRuntime.PYTHON3_10, ProviderEnum.AWS)).toBe(true);
    });
  });

  describe('getSupportedRuntimes', () => {
    it('returns all standard runtimes when no provider specified', () => {
      const allRuntimes = getSupportedRuntimes();
      expect(allRuntimes).toContain(StandardRuntime.NODEJS24);
      expect(allRuntimes).toContain(StandardRuntime.PYTHON3_14);
      expect(allRuntimes).toContain(StandardRuntime.JAVA8);
      expect(allRuntimes).toContain(StandardRuntime.PHP7_2);
      expect(allRuntimes).toContain(StandardRuntime.GO1);
      expect(allRuntimes).toContain(StandardRuntime.DOTNET_CORE3_1);
    });

    it('returns only Aliyun-supported runtimes', () => {
      const aliyunRuntimes = getSupportedRuntimes(ProviderEnum.ALIYUN);
      expect(aliyunRuntimes).toContain(StandardRuntime.NODEJS20);
      expect(aliyunRuntimes).toContain(StandardRuntime.NODEJS18);
      expect(aliyunRuntimes).toContain(StandardRuntime.PYTHON3_12);
      expect(aliyunRuntimes).toContain(StandardRuntime.JAVA11);
      expect(aliyunRuntimes).toContain(StandardRuntime.GO1);
      expect(aliyunRuntimes).toContain(StandardRuntime.DOTNET_CORE3_1);
      expect(aliyunRuntimes).not.toContain(StandardRuntime.NODEJS24);
      expect(aliyunRuntimes).not.toContain(StandardRuntime.PHP8_0);
    });

    it('returns only Tencent-supported runtimes', () => {
      const tencentRuntimes = getSupportedRuntimes(ProviderEnum.TENCENT);
      expect(tencentRuntimes).toContain(StandardRuntime.NODEJS18);
      expect(tencentRuntimes).toContain(StandardRuntime.PYTHON3_10);
      expect(tencentRuntimes).toContain(StandardRuntime.JAVA8);
      expect(tencentRuntimes).toContain(StandardRuntime.PHP8_0);
      expect(tencentRuntimes).toContain(StandardRuntime.GO1);
      expect(tencentRuntimes).not.toContain(StandardRuntime.NODEJS24);
      expect(tencentRuntimes).not.toContain(StandardRuntime.DOTNET_CORE3_1);
    });

    it('returns only AWS-supported runtimes', () => {
      const awsRuntimes = getSupportedRuntimes(ProviderEnum.AWS);
      expect(awsRuntimes).toContain(StandardRuntime.NODEJS24);
      expect(awsRuntimes).toContain(StandardRuntime.NODEJS22);
      expect(awsRuntimes).toContain(StandardRuntime.PYTHON3_14);
      expect(awsRuntimes).toContain(StandardRuntime.JAVA25);
      expect(awsRuntimes).not.toContain(StandardRuntime.PHP8_0);
      expect(awsRuntimes).not.toContain(StandardRuntime.GO1);
      expect(awsRuntimes).not.toContain(StandardRuntime.DOTNET_CORE3_1);
    });
  });
});
