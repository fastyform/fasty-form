export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      submissions: {
        Row: {
          client_description: string | null;
          client_id: string | null;
          created_at: string;
          id: string;
          paidout_at: string | null;
          price_in_grosz: number;
          reviewed_at: string | null;
          status: Database['public']['Enums']['status'];
          stripe_session_id: string;
          trainer_id: string;
          trainer_review: string | null;
          updated_at: string;
          video_key: string | null;
        };
        Insert: {
          client_description?: string | null;
          client_id?: string | null;
          created_at?: string;
          id?: string;
          paidout_at?: string | null;
          price_in_grosz: number;
          reviewed_at?: string | null;
          status?: Database['public']['Enums']['status'];
          stripe_session_id: string;
          trainer_id: string;
          trainer_review?: string | null;
          updated_at?: string;
          video_key?: string | null;
        };
        Update: {
          client_description?: string | null;
          client_id?: string | null;
          created_at?: string;
          id?: string;
          paidout_at?: string | null;
          price_in_grosz?: number;
          reviewed_at?: string | null;
          status?: Database['public']['Enums']['status'];
          stripe_session_id?: string;
          trainer_id?: string;
          trainer_review?: string | null;
          updated_at?: string;
          video_key?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'submissions_client_id_fkey';
            columns: ['client_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'submissions_trainer_id_fkey';
            columns: ['trainer_id'];
            referencedRelation: 'trainers_details';
            referencedColumns: ['user_id'];
          },
        ];
      };
      trainers_details: {
        Row: {
          created_at: string;
          email: string | null;
          is_onboarded: boolean;
          onboarded_at: string | null;
          profile_image_url: string | null;
          profile_name: string | null;
          profile_slug: string | null;
          service_price_in_grosz: number | null;
          stripe_account_id: string | null;
          stripe_onboarding_status: Database['public']['Enums']['stripe_onboarding_status_enum'];
          stripe_price_id: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          is_onboarded?: boolean;
          onboarded_at?: string | null;
          profile_image_url?: string | null;
          profile_name?: string | null;
          profile_slug?: string | null;
          service_price_in_grosz?: number | null;
          stripe_account_id?: string | null;
          stripe_onboarding_status?: Database['public']['Enums']['stripe_onboarding_status_enum'];
          stripe_price_id?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          is_onboarded?: boolean;
          onboarded_at?: string | null;
          profile_image_url?: string | null;
          profile_name?: string | null;
          profile_slug?: string | null;
          service_price_in_grosz?: number | null;
          stripe_account_id?: string | null;
          stripe_onboarding_status?: Database['public']['Enums']['stripe_onboarding_status_enum'];
          stripe_price_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_trainers_details_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'user_data';
            referencedColumns: ['user_id'];
          },
          {
            foreignKeyName: 'trainers_details_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      user_data: {
        Row: {
          consent_modal_displayed: boolean;
          locale: Database['public']['Enums']['locales'];
          marketing_consent: boolean;
          role: Database['public']['Enums']['role'] | null;
          user_id: string;
        };
        Insert: {
          consent_modal_displayed?: boolean;
          locale?: Database['public']['Enums']['locales'];
          marketing_consent?: boolean;
          role?: Database['public']['Enums']['role'] | null;
          user_id: string;
        };
        Update: {
          consent_modal_displayed?: boolean;
          locale?: Database['public']['Enums']['locales'];
          marketing_consent?: boolean;
          role?: Database['public']['Enums']['role'] | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'roles_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      ordered_submissions_client: {
        Row: {
          client_description: string | null;
          client_id: string | null;
          created_at: string | null;
          id: string | null;
          price_in_grosz: number | null;
          status: Database['public']['Enums']['status'] | null;
          stripe_session_id: string | null;
          trainer_id: string | null;
          trainer_review: string | null;
          updated_at: string | null;
          video_key: string | null;
        };
        Insert: {
          client_description?: string | null;
          client_id?: string | null;
          created_at?: string | null;
          id?: string | null;
          price_in_grosz?: number | null;
          status?: Database['public']['Enums']['status'] | null;
          stripe_session_id?: string | null;
          trainer_id?: string | null;
          trainer_review?: string | null;
          updated_at?: string | null;
          video_key?: string | null;
        };
        Update: {
          client_description?: string | null;
          client_id?: string | null;
          created_at?: string | null;
          id?: string | null;
          price_in_grosz?: number | null;
          status?: Database['public']['Enums']['status'] | null;
          stripe_session_id?: string | null;
          trainer_id?: string | null;
          trainer_review?: string | null;
          updated_at?: string | null;
          video_key?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'submissions_client_id_fkey';
            columns: ['client_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'submissions_trainer_id_fkey';
            columns: ['trainer_id'];
            referencedRelation: 'trainers_details';
            referencedColumns: ['user_id'];
          },
        ];
      };
      ordered_submissions_trainer: {
        Row: {
          client_description: string | null;
          client_id: string | null;
          created_at: string | null;
          id: string | null;
          price_in_grosz: number | null;
          status: Database['public']['Enums']['status'] | null;
          stripe_session_id: string | null;
          trainer_id: string | null;
          trainer_review: string | null;
          updated_at: string | null;
          video_key: string | null;
        };
        Insert: {
          client_description?: string | null;
          client_id?: string | null;
          created_at?: string | null;
          id?: string | null;
          price_in_grosz?: number | null;
          status?: Database['public']['Enums']['status'] | null;
          stripe_session_id?: string | null;
          trainer_id?: string | null;
          trainer_review?: string | null;
          updated_at?: string | null;
          video_key?: string | null;
        };
        Update: {
          client_description?: string | null;
          client_id?: string | null;
          created_at?: string | null;
          id?: string | null;
          price_in_grosz?: number | null;
          status?: Database['public']['Enums']['status'] | null;
          stripe_session_id?: string | null;
          trainer_id?: string | null;
          trainer_review?: string | null;
          updated_at?: string | null;
          video_key?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'submissions_client_id_fkey';
            columns: ['client_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'submissions_trainer_id_fkey';
            columns: ['trainer_id'];
            referencedRelation: 'trainers_details';
            referencedColumns: ['user_id'];
          },
        ];
      };
    };
    Functions: {
      delete_claim: {
        Args: {
          uid: string;
          claim: string;
        };
        Returns: string;
      };
      fetch_trainers: {
        Args: {
          start: number;
          stop: number;
          seed: string;
          filters?: Json;
          order_by?: string;
          order_dir?: string;
        };
        Returns: {
          user_id: string;
          service_price_in_grosz: number;
          profile_name: string;
          profile_image_url: string;
          profile_slug: string;
        }[];
      };
      get_claim: {
        Args: {
          uid: string;
          claim: string;
        };
        Returns: Json;
      };
      get_claims: {
        Args: {
          uid: string;
        };
        Returns: Json;
      };
      get_my_claim: {
        Args: {
          claim: string;
        };
        Returns: Json;
      };
      get_my_claims: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      get_user_id_by_email: {
        Args: {
          email: string;
        };
        Returns: {
          id: string;
        }[];
      };
      is_claims_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      set_claim: {
        Args: {
          uid: string;
          claim: string;
          value: Json;
        };
        Returns: string;
      };
    };
    Enums: {
      locales: 'pl' | 'en';
      role: 'trainer' | 'client';
      status: 'reviewed' | 'unreviewed' | 'paid' | 'paidout';
      stripe_onboarding_status_enum: 'verified' | 'unverified' | 'pending_verification';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          owner_id: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          owner_id: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey';
            columns: ['bucket_id'];
            referencedRelation: 'buckets';
            referencedColumns: ['id'];
          },
        ];
      };
      s3_multipart_uploads: {
        Row: {
          bucket_id: string;
          created_at: string;
          id: string;
          in_progress_size: number;
          key: string;
          owner_id: string | null;
          upload_signature: string;
          version: string;
        };
        Insert: {
          bucket_id: string;
          created_at?: string;
          id: string;
          in_progress_size?: number;
          key: string;
          owner_id?: string | null;
          upload_signature: string;
          version: string;
        };
        Update: {
          bucket_id?: string;
          created_at?: string;
          id?: string;
          in_progress_size?: number;
          key?: string;
          owner_id?: string | null;
          upload_signature?: string;
          version?: string;
        };
        Relationships: [
          {
            foreignKeyName: 's3_multipart_uploads_bucket_id_fkey';
            columns: ['bucket_id'];
            referencedRelation: 'buckets';
            referencedColumns: ['id'];
          },
        ];
      };
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string;
          created_at: string;
          etag: string;
          id: string;
          key: string;
          owner_id: string | null;
          part_number: number;
          size: number;
          upload_id: string;
          version: string;
        };
        Insert: {
          bucket_id: string;
          created_at?: string;
          etag: string;
          id?: string;
          key: string;
          owner_id?: string | null;
          part_number: number;
          size?: number;
          upload_id: string;
          version: string;
        };
        Update: {
          bucket_id?: string;
          created_at?: string;
          etag?: string;
          id?: string;
          key?: string;
          owner_id?: string | null;
          part_number?: number;
          size?: number;
          upload_id?: string;
          version?: string;
        };
        Relationships: [
          {
            foreignKeyName: 's3_multipart_uploads_parts_bucket_id_fkey';
            columns: ['bucket_id'];
            referencedRelation: 'buckets';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 's3_multipart_uploads_parts_upload_id_fkey';
            columns: ['upload_id'];
            referencedRelation: 's3_multipart_uploads';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: string[];
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string;
          prefix_param: string;
          delimiter_param: string;
          max_keys?: number;
          next_key_token?: string;
          next_upload_token?: string;
        };
        Returns: {
          key: string;
          id: string;
          created_at: string;
        }[];
      };
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string;
          prefix_param: string;
          delimiter_param: string;
          max_keys?: number;
          start_after?: string;
          next_token?: string;
        };
        Returns: {
          name: string;
          id: string;
          metadata: Json;
          updated_at: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
