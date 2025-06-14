export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      frames: {
        Row: {
          comments: number | null
          content: string
          created_at: string | null
          id: string
          likes: number | null
          updated_at: string | null
          user_id: string | null
          video_url: string | null
        }
        Insert: {
          comments?: number | null
          content: string
          created_at?: string | null
          id?: string
          likes?: number | null
          updated_at?: string | null
          user_id?: string | null
          video_url?: string | null
        }
        Update: {
          comments?: number | null
          content?: string
          created_at?: string | null
          id?: string
          likes?: number | null
          updated_at?: string | null
          user_id?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      link_clicks: {
        Row: {
          created_at: string
          id: string
          link_label: string
          referrer: string | null
          timestamp: string
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          link_label: string
          referrer?: string | null
          timestamp?: string
          url: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          link_label?: string
          referrer?: string | null
          timestamp?: string
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          actor_user_id: string | null
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          message: string
          target_id: string | null
          target_type: string | null
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          actor_user_id?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message: string
          target_id?: string | null
          target_type?: string | null
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          actor_user_id?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string
          target_id?: string | null
          target_type?: string | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          comments: number | null
          content: string
          created_at: string | null
          id: string
          likes: number | null
          media_type: string | null
          media_url: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comments?: number | null
          content: string
          created_at?: string | null
          id?: string
          likes?: number | null
          media_type?: string | null
          media_url?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comments?: number | null
          content?: string
          created_at?: string | null
          id?: string
          likes?: number | null
          media_type?: string | null
          media_url?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profile_builder: {
        Row: {
          background_type: Database["public"]["Enums"]["background_type"] | null
          background_value: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          font_type: Database["public"]["Enums"]["font_type"] | null
          id: string
          is_published: boolean | null
          profile_picture_url: string | null
          theme_color: string | null
          updated_at: string | null
          url_slug: string | null
          user_id: string
        }
        Insert: {
          background_type?:
            | Database["public"]["Enums"]["background_type"]
            | null
          background_value?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          font_type?: Database["public"]["Enums"]["font_type"] | null
          id?: string
          is_published?: boolean | null
          profile_picture_url?: string | null
          theme_color?: string | null
          updated_at?: string | null
          url_slug?: string | null
          user_id: string
        }
        Update: {
          background_type?:
            | Database["public"]["Enums"]["background_type"]
            | null
          background_value?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          font_type?: Database["public"]["Enums"]["font_type"] | null
          id?: string
          is_published?: boolean | null
          profile_picture_url?: string | null
          theme_color?: string | null
          updated_at?: string | null
          url_slug?: string | null
          user_id?: string
        }
        Relationships: []
      }
      project_collaborators: {
        Row: {
          created_at: string
          id: string
          project_id: string
          role: Database["public"]["Enums"]["project_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_id: string
          role: Database["public"]["Enums"]["project_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string
          role?: Database["public"]["Enums"]["project_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_collaborators_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_views: {
        Row: {
          created_at: string
          id: string
          project_id: string
          referrer: string | null
          timestamp: string
          viewer_user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          project_id: string
          referrer?: string | null
          timestamp?: string
          viewer_user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string
          referrer?: string | null
          timestamp?: string
          viewer_user_id?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          cover_image_url: string | null
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          owner_id: string
          tags: string[] | null
          title: string
          trailer_url: string | null
          updated_at: string
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          owner_id: string
          tags?: string[] | null
          title: string
          trailer_url?: string | null
          updated_at?: string
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          owner_id?: string
          tags?: string[] | null
          title?: string
          trailer_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      social_links: {
        Row: {
          created_at: string | null
          display_order: number
          id: string
          label: string
          platform: Database["public"]["Enums"]["social_platform"]
          profile_id: string
          url: string
        }
        Insert: {
          created_at?: string | null
          display_order?: number
          id?: string
          label: string
          platform: Database["public"]["Enums"]["social_platform"]
          profile_id: string
          url: string
        }
        Update: {
          created_at?: string | null
          display_order?: number
          id?: string
          label?: string
          platform?: Database["public"]["Enums"]["social_platform"]
          profile_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_links_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile_builder"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          category: string
          created_at: string
          description: string
          file_url: string | null
          id: string
          status: string
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          file_url?: string | null
          id?: string
          status?: string
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          file_url?: string | null
          id?: string
          status?: string
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_invitations: {
        Row: {
          created_at: string
          email: string
          expires_at: string
          id: string
          invited_by: string | null
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          invited_by?: string | null
          role: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          invited_by?: string | null
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      users_management: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          role: Database["public"]["Enums"]["user_role"]
          status: Database["public"]["Enums"]["user_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["user_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["user_status"]
          updated_at?: string
        }
        Relationships: []
      }
      view_logs: {
        Row: {
          created_at: string
          id: string
          referrer: string | null
          target_id: string | null
          timestamp: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          referrer?: string | null
          target_id?: string | null
          timestamp?: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          referrer?: string | null
          target_id?: string | null
          timestamp?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      background_type: "solid" | "gradient" | "image"
      font_type: "inter" | "poppins" | "roboto" | "open-sans" | "playfair"
      project_role:
        | "director"
        | "producer"
        | "actor"
        | "cinematographer"
        | "editor"
        | "writer"
        | "composer"
        | "sound_designer"
        | "production_designer"
        | "costume_designer"
        | "makeup_artist"
        | "other"
      social_platform:
        | "instagram"
        | "imdb"
        | "youtube"
        | "vimeo"
        | "x"
        | "tiktok"
        | "website"
        | "other"
      user_role: "admin" | "creator" | "viewer"
      user_status: "active" | "suspended" | "pending"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      background_type: ["solid", "gradient", "image"],
      font_type: ["inter", "poppins", "roboto", "open-sans", "playfair"],
      project_role: [
        "director",
        "producer",
        "actor",
        "cinematographer",
        "editor",
        "writer",
        "composer",
        "sound_designer",
        "production_designer",
        "costume_designer",
        "makeup_artist",
        "other",
      ],
      social_platform: [
        "instagram",
        "imdb",
        "youtube",
        "vimeo",
        "x",
        "tiktok",
        "website",
        "other",
      ],
      user_role: ["admin", "creator", "viewer"],
      user_status: ["active", "suspended", "pending"],
    },
  },
} as const
