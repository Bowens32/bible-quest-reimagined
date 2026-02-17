export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          category: string
          description: string
          icon: string
          id: string
          name: string
        }
        Insert: {
          category?: string
          description: string
          icon?: string
          id: string
          name: string
        }
        Update: {
          category?: string
          description?: string
          icon?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      bible_verses: {
        Row: {
          book_id: string
          chapter: number
          id: number
          text: string
          verse_number: number
          version_id: string
        }
        Insert: {
          book_id: string
          chapter: number
          id?: never
          text: string
          verse_number: number
          version_id: string
        }
        Update: {
          book_id?: string
          chapter?: number
          id?: never
          text?: string
          verse_number?: number
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bible_verses_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "bible_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      bible_versions: {
        Row: {
          description: string | null
          id: string
          language: string
          name: string
        }
        Insert: {
          description?: string | null
          id: string
          language?: string
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          language?: string
          name?: string
        }
        Relationships: []
      }
      chapters_read: {
        Row: {
          book_id: string
          chapter: number
          id: string
          read_at: string
          user_id: string
        }
        Insert: {
          book_id: string
          chapter: number
          id?: string
          read_at?: string
          user_id: string
        }
        Update: {
          book_id?: string
          chapter?: number
          id?: string
          read_at?: string
          user_id?: string
        }
        Relationships: []
      }
      community_posts: {
        Row: {
          content: string
          created_at: string
          file_url: string | null
          id: string
          likes_count: number
          parent_id: string | null
          title: string | null
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          file_url?: string | null
          id?: string
          likes_count?: number
          parent_id?: string | null
          title?: string | null
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          file_url?: string | null
          id?: string
          likes_count?: number
          parent_id?: string | null
          title?: string | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_quotes: {
        Row: {
          book_id: string
          chapter: number
          id: string
          quote_date: string
          text: string
          verse_number: number
        }
        Insert: {
          book_id: string
          chapter: number
          id?: string
          quote_date?: string
          text: string
          verse_number: number
        }
        Update: {
          book_id?: string
          chapter?: number
          id?: string
          quote_date?: string
          text?: string
          verse_number?: number
        }
        Relationships: []
      }
      friendships: {
        Row: {
          addressee_id: string
          created_at: string
          id: string
          requester_id: string
          status: string
        }
        Insert: {
          addressee_id: string
          created_at?: string
          id?: string
          requester_id: string
          status?: string
        }
        Update: {
          addressee_id?: string
          created_at?: string
          id?: string
          requester_id?: string
          status?: string
        }
        Relationships: []
      }
      highlights: {
        Row: {
          book_id: string
          chapter: number
          color: string
          created_at: string
          id: string
          user_id: string
          verse_number: number
          version_id: string
        }
        Insert: {
          book_id: string
          chapter: number
          color?: string
          created_at?: string
          id?: string
          user_id: string
          verse_number: number
          version_id: string
        }
        Update: {
          book_id?: string
          chapter?: number
          color?: string
          created_at?: string
          id?: string
          user_id?: string
          verse_number?: number
          version_id?: string
        }
        Relationships: []
      }
      notes: {
        Row: {
          book_id: string
          chapter: number
          content: string
          created_at: string
          id: string
          is_public: boolean
          updated_at: string
          user_id: string
          verse_number: number | null
        }
        Insert: {
          book_id: string
          chapter: number
          content: string
          created_at?: string
          id?: string
          is_public?: boolean
          updated_at?: string
          user_id: string
          verse_number?: number | null
        }
        Update: {
          book_id?: string
          chapter?: number
          content?: string
          created_at?: string
          id?: string
          is_public?: boolean
          updated_at?: string
          user_id?: string
          verse_number?: number | null
        }
        Relationships: []
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          app_language: string
          avatar_url: string | null
          created_at: string
          display_name: string
          friend_code: string
          id: string
          last_read_date: string | null
          preferred_language: string
          preferred_version: string
          streak: number
          text_size: string
          theme: string
          total_answered: number
          total_correct: number
          updated_at: string
          user_id: string
        }
        Insert: {
          app_language?: string
          avatar_url?: string | null
          created_at?: string
          display_name?: string
          friend_code?: string
          id?: string
          last_read_date?: string | null
          preferred_language?: string
          preferred_version?: string
          streak?: number
          text_size?: string
          theme?: string
          total_answered?: number
          total_correct?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          app_language?: string
          avatar_url?: string | null
          created_at?: string
          display_name?: string
          friend_code?: string
          id?: string
          last_read_date?: string | null
          preferred_language?: string
          preferred_version?: string
          streak?: number
          text_size?: string
          theme?: string
          total_answered?: number
          total_correct?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      shared_notes: {
        Row: {
          created_at: string
          id: string
          note_id: string
          shared_by: string
          shared_with: string
        }
        Insert: {
          created_at?: string
          id?: string
          note_id: string
          shared_by: string
          shared_with: string
        }
        Update: {
          created_at?: string
          id?: string
          note_id?: string
          shared_by?: string
          shared_with?: string
        }
        Relationships: [
          {
            foreignKeyName: "shared_notes_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
        ]
      }
      trivia_matches: {
        Row: {
          book_id: string | null
          challenger_id: string
          challenger_score: number | null
          chapter: number | null
          created_at: string
          id: string
          is_npc: boolean
          opponent_id: string | null
          opponent_score: number | null
          status: string
        }
        Insert: {
          book_id?: string | null
          challenger_id: string
          challenger_score?: number | null
          chapter?: number | null
          created_at?: string
          id?: string
          is_npc?: boolean
          opponent_id?: string | null
          opponent_score?: number | null
          status?: string
        }
        Update: {
          book_id?: string | null
          challenger_id?: string
          challenger_score?: number | null
          chapter?: number | null
          created_at?: string
          id?: string
          is_npc?: boolean
          opponent_id?: string | null
          opponent_score?: number | null
          status?: string
        }
        Relationships: []
      }
      trivia_questions: {
        Row: {
          book_id: string
          chapter: number
          correct_index: number
          difficulty: string
          id: string
          options: string[]
          question: string
        }
        Insert: {
          book_id: string
          chapter: number
          correct_index: number
          difficulty?: string
          id?: string
          options: string[]
          question: string
        }
        Update: {
          book_id?: string
          chapter?: number
          correct_index?: number
          difficulty?: string
          id?: string
          options?: string[]
          question?: string
        }
        Relationships: []
      }
      trivia_scores: {
        Row: {
          book_id: string
          chapter: number
          id: string
          played_at: string
          score: number
          total: number
          user_id: string
        }
        Insert: {
          book_id: string
          chapter: number
          id?: string
          played_at?: string
          score: number
          total: number
          user_id: string
        }
        Update: {
          book_id?: string
          chapter?: number
          id?: string
          played_at?: string
          score?: number
          total?: number
          user_id?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
