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
      social_platform:
        | "instagram"
        | "imdb"
        | "youtube"
        | "vimeo"
        | "x"
        | "tiktok"
        | "website"
        | "other"
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
    },
  },
} as const
