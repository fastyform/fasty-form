export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      orders: {
        Row: {
          client_id: string | null;
          created_at: string;
          id: string;
          trainer_id: string | null;
        };
        Insert: {
          client_id?: string | null;
          created_at?: string;
          id?: string;
          trainer_id?: string | null;
        };
        Update: {
          client_id?: string | null;
          created_at?: string;
          id?: string;
          trainer_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'orders_client_id_fkey';
            columns: ['client_id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_trainer_id_fkey';
            columns: ['trainer_id'];
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
          id: number;
          order_id: string;
          trainer_id: string;
          trainer_review: string | null;
          updated_at: string | null;
          video_url: string;
        };
        Insert: {
          client_description?: string | null;
          client_id?: string | null;
          created_at?: string;
          guest_mail?: string | null;
          id?: number;
          order_id: string;
          trainer_id: string;
          trainer_review?: string | null;
          updated_at?: string | null;
          video_url: string;
        };
        Update: {
          client_description?: string | null;
          client_id?: string | null;
          created_at?: string;
          guest_mail?: string | null;
          id?: number;
          order_id?: string;
          trainer_id?: string;
          trainer_review?: string | null;
          updated_at?: string | null;
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
          id: number;
          profile_name: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          profile_name: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          profile_name?: string;
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
      users: {
        Row: {
          created_at: string;
          first_name: string | null;
          id: string;
          last_name: string | null;
          type: Database['public']['Enums']['user_type'];
        };
        Insert: {
          created_at?: string;
          first_name?: string | null;
          id: string;
          last_name?: string | null;
          type?: Database['public']['Enums']['user_type'];
        };
        Update: {
          created_at?: string;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          type?: Database['public']['Enums']['user_type'];
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users_roles: {
        Row: {
          id: number;
          role: Database['public']['Enums']['user_type'];
          user_id: string;
        };
        Insert: {
          id?: number;
          role: Database['public']['Enums']['user_type'];
          user_id: string;
        };
        Update: {
          id?: number;
          role?: Database['public']['Enums']['user_type'];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'users_roles_user_id_fkey';
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
      status: 'reviewed' | 'unreviewed';
      user_type: 'trainer' | 'client';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
