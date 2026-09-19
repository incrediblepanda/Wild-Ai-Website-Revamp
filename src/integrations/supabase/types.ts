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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      attendees: {
        Row: {
          company: string | null
          created_at: string
          email: string
          events_attended: string[]
          first_name: string | null
          id: string
          last_name: string | null
          name: string
          notes: string | null
          phone: string | null
          source: string
          subscribed: boolean
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          events_attended?: string[]
          first_name?: string | null
          id?: string
          last_name?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          source?: string
          subscribed?: boolean
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          events_attended?: string[]
          first_name?: string | null
          id?: string
          last_name?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          source?: string
          subscribed?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      chapter_applications: {
        Row: {
          background: string | null
          city: string
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
        }
        Insert: {
          background?: string | null
          city: string
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
        }
        Update: {
          background?: string | null
          city?: string
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
        }
        Relationships: []
      }
      chapter_events: {
        Row: {
          agenda: Json
          attendee_count: number | null
          chapter_id: string
          created_at: string
          description: string | null
          end_time: string | null
          event_date: string
          id: string
          meetup_url: string | null
          recap_url: string | null
          slug: string
          speakers: Json
          start_time: string | null
          title: string
          updated_at: string
          venue_address: string | null
          venue_name: string | null
        }
        Insert: {
          agenda?: Json
          attendee_count?: number | null
          chapter_id: string
          created_at?: string
          description?: string | null
          end_time?: string | null
          event_date: string
          id?: string
          meetup_url?: string | null
          recap_url?: string | null
          slug: string
          speakers?: Json
          start_time?: string | null
          title: string
          updated_at?: string
          venue_address?: string | null
          venue_name?: string | null
        }
        Update: {
          agenda?: Json
          attendee_count?: number | null
          chapter_id?: string
          created_at?: string
          description?: string | null
          end_time?: string | null
          event_date?: string
          id?: string
          meetup_url?: string | null
          recap_url?: string | null
          slug?: string
          speakers?: Json
          start_time?: string | null
          title?: string
          updated_at?: string
          venue_address?: string | null
          venue_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chapter_events_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      chapter_organizers: {
        Row: {
          bio: string | null
          chapter_id: string
          contact_email: string | null
          created_at: string
          id: string
          name: string
          photo_url: string | null
          role: string | null
          sort_order: number | null
        }
        Insert: {
          bio?: string | null
          chapter_id: string
          contact_email?: string | null
          created_at?: string
          id?: string
          name: string
          photo_url?: string | null
          role?: string | null
          sort_order?: number | null
        }
        Update: {
          bio?: string | null
          chapter_id?: string
          contact_email?: string | null
          created_at?: string
          id?: string
          name?: string
          photo_url?: string | null
          role?: string | null
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "chapter_organizers_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      chapter_subscribers: {
        Row: {
          chapter_id: string | null
          city_requested: string | null
          created_at: string
          email: string
          id: string
          source: string | null
        }
        Insert: {
          chapter_id?: string | null
          city_requested?: string | null
          created_at?: string
          email: string
          id?: string
          source?: string | null
        }
        Update: {
          chapter_id?: string | null
          city_requested?: string | null
          created_at?: string
          email?: string
          id?: string
          source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chapter_subscribers_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      chapters: {
        Row: {
          about_text: string | null
          cadence: string | null
          city: string
          created_at: string
          id: string
          member_count: number | null
          region: string | null
          slug: string
          sort_order: number | null
          status: string
          tagline: string | null
          updated_at: string
          venue_address: string | null
          venue_name: string | null
          venue_notes: string | null
        }
        Insert: {
          about_text?: string | null
          cadence?: string | null
          city: string
          created_at?: string
          id?: string
          member_count?: number | null
          region?: string | null
          slug: string
          sort_order?: number | null
          status?: string
          tagline?: string | null
          updated_at?: string
          venue_address?: string | null
          venue_name?: string | null
          venue_notes?: string | null
        }
        Update: {
          about_text?: string | null
          cadence?: string | null
          city?: string
          created_at?: string
          id?: string
          member_count?: number | null
          region?: string | null
          slug?: string
          sort_order?: number | null
          status?: string
          tagline?: string | null
          updated_at?: string
          venue_address?: string | null
          venue_name?: string | null
          venue_notes?: string | null
        }
        Relationships: []
      }
      email_automation_runs: {
        Row: {
          automation_id: string
          campaign_id: string | null
          event_id: string
          id: string
          ran_at: string
          recipient_count: number
        }
        Insert: {
          automation_id: string
          campaign_id?: string | null
          event_id: string
          id?: string
          ran_at?: string
          recipient_count?: number
        }
        Update: {
          automation_id?: string
          campaign_id?: string | null
          event_id?: string
          id?: string
          ran_at?: string
          recipient_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "email_automation_runs_automation_id_fkey"
            columns: ["automation_id"]
            isOneToOne: false
            referencedRelation: "email_automations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_automation_runs_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_automation_runs_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      email_automations: {
        Row: {
          audience: string
          created_at: string
          created_by: string | null
          enabled: boolean
          id: string
          name: string
          offset_days: number
          send_time: string
          template_id: string | null
          updated_at: string
        }
        Insert: {
          audience?: string
          created_at?: string
          created_by?: string | null
          enabled?: boolean
          id?: string
          name: string
          offset_days: number
          send_time?: string
          template_id?: string | null
          updated_at?: string
        }
        Update: {
          audience?: string
          created_at?: string
          created_by?: string | null
          enabled?: boolean
          id?: string
          name?: string
          offset_days?: number
          send_time?: string
          template_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_automations_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_campaigns: {
        Row: {
          error_count: number
          html: string
          id: string
          recipient_count: number
          sent_at: string
          sent_by: string | null
          subject: string
          success_count: number
          template_id: string | null
        }
        Insert: {
          error_count?: number
          html: string
          id?: string
          recipient_count?: number
          sent_at?: string
          sent_by?: string | null
          subject: string
          success_count?: number
          template_id?: string | null
        }
        Update: {
          error_count?: number
          html?: string
          id?: string
          recipient_count?: number
          sent_at?: string
          sent_by?: string | null
          subject?: string
          success_count?: number
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_campaigns_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_sends: {
        Row: {
          attendee_id: string | null
          campaign_id: string | null
          created_at: string
          email: string
          error: string | null
          id: string
          status: string
        }
        Insert: {
          attendee_id?: string | null
          campaign_id?: string | null
          created_at?: string
          email: string
          error?: string | null
          id?: string
          status: string
        }
        Update: {
          attendee_id?: string | null
          campaign_id?: string | null
          created_at?: string
          email?: string
          error?: string | null
          id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_sends_attendee_id_fkey"
            columns: ["attendee_id"]
            isOneToOne: false
            referencedRelation: "attendees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_sends_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          created_at: string
          created_by: string | null
          html: string
          id: string
          name: string
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          html: string
          id?: string
          name: string
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          html?: string
          id?: string
          name?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          end_time: string | null
          event_date: string
          id: string
          linkedin_event_created: boolean
          location: string | null
          meetup_event_created: boolean
          notes: string | null
          speakers: string | null
          start_time: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_time?: string | null
          event_date: string
          id?: string
          linkedin_event_created?: boolean
          location?: string | null
          meetup_event_created?: boolean
          notes?: string | null
          speakers?: string | null
          start_time?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_time?: string | null
          event_date?: string
          id?: string
          linkedin_event_created?: boolean
          location?: string | null
          meetup_event_created?: boolean
          notes?: string | null
          speakers?: string | null
          start_time?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      show_and_tell_submissions: {
        Row: {
          approval_token: string
          created_at: string
          description: string
          email: string
          id: string
          image_url: string | null
          linkedin_url: string
          name: string
          project_name: string
          status: string
        }
        Insert: {
          approval_token?: string
          created_at?: string
          description: string
          email: string
          id?: string
          image_url?: string | null
          linkedin_url: string
          name: string
          project_name: string
          status?: string
        }
        Update: {
          approval_token?: string
          created_at?: string
          description?: string
          email?: string
          id?: string
          image_url?: string | null
          linkedin_url?: string
          name?: string
          project_name?: string
          status?: string
        }
        Relationships: []
      }
      speakers: {
        Row: {
          created_at: string
          description: string | null
          email: string
          event_id: string | null
          id: string
          image_url: string | null
          linkedin_url: string | null
          name: string
          notes: string | null
          phone: string | null
          status: string
          updated_at: string
          what_building: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          email: string
          event_id?: string | null
          id?: string
          image_url?: string | null
          linkedin_url?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
          what_building?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          email?: string
          event_id?: string | null
          id?: string
          image_url?: string | null
          linkedin_url?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
          what_building?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "speakers_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsor_leads: {
        Row: {
          company: string
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          tier: string | null
        }
        Insert: {
          company: string
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          tier?: string | null
        }
        Update: {
          company?: string
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          tier?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_first_admin: { Args: never; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_any_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "super_admin"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "super_admin"],
    },
  },
} as const
