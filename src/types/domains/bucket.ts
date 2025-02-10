export type BucketDomain = {
  name: string;
  storage: {
    class: string;
  };
  versioning: {
    status: string;
  };
  lifecycle: {
    rule: {
      id: string;
    };
    status: string;
    expiration: {
      days: number;
    };
  };

  security: {
    force_delete: boolean;
    sse_algorithm: string;
    sse_kms_master_key_id: string;
  };
  website: {
    index: string;
    error: string;
  };
};
