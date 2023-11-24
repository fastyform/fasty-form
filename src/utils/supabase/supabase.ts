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
          guest_mail: string | null;
          id: string;
          order_id: string;
          status: Database['public']['Enums']['status'];
          thumbnail_url: string | null;
          trainer_id: string;
          trainer_review: string | null;
          updated_at: string;
          video_url: string;
        };
        Insert: {
          client_description?: string | null;
          client_id?: string | null;
          created_at?: string;
          guest_mail?: string | null;
          id?: string;
          order_id: string;
          status?: Database['public']['Enums']['status'];
          thumbnail_url?: string | null;
          trainer_id: string;
          trainer_review?: string | null;
          updated_at?: string;
          video_url: string;
        };
        Update: {
          client_description?: string | null;
          client_id?: string | null;
          created_at?: string;
          guest_mail?: string | null;
          id?: string;
          order_id?: string;
          status?: Database['public']['Enums']['status'];
          thumbnail_url?: string | null;
          trainer_id?: string;
          trainer_review?: string | null;
          updated_at?: string;
          video_url?: string;
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
          profile_image_url: string | null;
          profile_name: string | null;
          service_price: number | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          is_onboarded?: boolean;
          profile_image_url?: string | null;
          profile_name?: string | null;
          service_price?: number | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          is_onboarded?: boolean;
          profile_image_url?: string | null;
          profile_name?: string | null;
          service_price?: number | null;
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
      status: 'reviewed' | 'unreviewed';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
