export type BucketRaw = {
  name: string;
  storage?: {
    class: string;
  };
  versioning?: {
    status: string;
  };

  security?: {
    force_delete?: boolean;
    sse_algorithm?: string;
    sse_kms_master_key_id?: string;
  };
  website?: {
    index?: string;
    error_page?: string;
    error_code?: number;
  };
};

export type BucketDomain = {
  key: string;
  name: string;
  storage?: {
    class: string;
  };
  versioning?: {
    status: string;
  };

  security?: {
    force_delete: boolean;
    sse_algorithm?: string;
    sse_kms_master_key_id?: string;
  };
  website?: {
    index: string;
    error_page: string;
    error_code: number;
  };
};
