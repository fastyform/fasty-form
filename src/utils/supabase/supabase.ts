export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      roles: {
        Row: {
          role: Database['public']['Enums']['role'] | null;
          user_id: string;
        };
        Insert: {
          role?: Database['public']['Enums']['role'] | null;
          user_id: string;
        };
        Update: {
          role?: Database['public']['Enums']['role'] | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'roles_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      submissions: {
        Row: {
          client_description: string | null;
          client_id: string | null;
          created_at: string;
          id: string;
          order_id: string;
          price_in_grosz: number;
          status: Database['public']['Enums']['status'];
          thumbnail_url: string | null;
          trainer_id: string;
          trainer_review: string | null;
          updated_at: string;
          video_url: string | null;
        };
        Insert: {
          client_description?: string | null;
          client_id?: string | null;
          created_at?: string;
          id?: string;
          order_id: string;
          price_in_grosz: number;
          status?: Database['public']['Enums']['status'];
          thumbnail_url?: string | null;
          trainer_id: string;
          trainer_review?: string | null;
          updated_at?: string;
          video_url?: string | null;
        };
        Update: {
          client_description?: string | null;
          client_id?: string | null;
          created_at?: string;
          id?: string;
          order_id?: string;
          price_in_grosz?: number;
          status?: Database['public']['Enums']['status'];
          thumbnail_url?: string | null;
          trainer_id?: string;
          trainer_review?: string | null;
          updated_at?: string;
          video_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'submissions_client_id_fkey';
            columns: ['client_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'submissions_trainer_id_fkey';
            columns: ['trainer_id'];
            isOneToOne: false;
            referencedRelation: 'trainers_details';
            referencedColumns: ['user_id'];
          },
        ];
      };
      trainers_details: {
        Row: {
          created_at: string;
          is_onboarded: boolean;
          is_onboarded_stripe: boolean;
          profile_image_url: string | null;
          profile_name: string | null;
          service_price: number | null;
          stripe_account_id: string | null;
          stripe_price_id: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          is_onboarded?: boolean;
          is_onboarded_stripe?: boolean;
          profile_image_url?: string | null;
          profile_name?: string | null;
          service_price?: number | null;
          stripe_account_id?: string | null;
          stripe_price_id?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          is_onboarded?: boolean;
          is_onboarded_stripe?: boolean;
          profile_image_url?: string | null;
          profile_name?: string | null;
          service_price?: number | null;
          stripe_account_id?: string | null;
          stripe_price_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'trainers_details_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      delete_claim: {
        Args: {
          uid: string;
          claim: string;
        };
        Returns: string;
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
      role: 'trainer' | 'client';
      status: 'reviewed' | 'unreviewed' | 'paid' | 'paidout';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
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
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] & Database['public']['Views'])
    ? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
