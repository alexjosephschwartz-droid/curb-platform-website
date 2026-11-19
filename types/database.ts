// Generated types matching the Supabase schema in supabase/migrations/001_initial_schema.sql
// Once Supabase is set up, regenerate with: npx supabase gen types typescript --local > types/database.ts

export type UserRole = 'buyer' | 'dealer' | 'admin';
export type VehicleStatus = 'draft' | 'pending_approval' | 'approved' | 'listed' | 'sold' | 'cancelled';
export type AuctionStatus = 'scheduled' | 'active' | 'ended' | 'sold' | 'cancelled' | 'no_sale';
export type TransactionStatus = 'pending_payment' | 'paid' | 'in_escrow' | 'inspection_scheduled' | 'inspection_complete' | 'delivered' | 'funds_released' | 'disputed' | 'refunded' | 'cancelled';
export type BidStatus = 'active' | 'outbid' | 'won' | 'lost';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: UserRole;
          email: string;
          full_name: string | null;
          phone: string | null;
          dealership_name: string | null;
          dealer_license: string | null;
          dealer_address: string | null;
          dealer_city: string | null;
          dealer_state: string | null;
          dealer_zip: string | null;
          billing_address: string | null;
          stripe_customer_id: string | null;
          stripe_connect_account_id: string | null;
          is_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role?: UserRole;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          dealership_name?: string | null;
          dealer_license?: string | null;
          dealer_address?: string | null;
          dealer_city?: string | null;
          dealer_state?: string | null;
          dealer_zip?: string | null;
          billing_address?: string | null;
          stripe_customer_id?: string | null;
          stripe_connect_account_id?: string | null;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      vehicles: {
        Row: {
          id: string;
          dealer_id: string;
          vin: string;
          year: number;
          make: string;
          model: string;
          trim: string | null;
          body_style: string | null;
          exterior_color: string | null;
          interior_color: string | null;
          engine: string | null;
          transmission: string | null;
          drivetrain: string | null;
          fuel_type: string | null;
          mileage: number;
          retail_value: number | null;
          reserve_price: number;
          condition_notes: string | null;
          known_issues: string | null;
          repair_estimate: number | null;
          inspection_notes: string | null;
          photos: string[];
          photo_count: number;
          status: VehicleStatus;
          rejection_reason: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          dealer_id: string;
          vin: string;
          year: number;
          make: string;
          model: string;
          trim?: string | null;
          body_style?: string | null;
          exterior_color?: string | null;
          interior_color?: string | null;
          engine?: string | null;
          transmission?: string | null;
          drivetrain?: string | null;
          fuel_type?: string | null;
          mileage: number;
          retail_value?: number | null;
          reserve_price: number;
          condition_notes?: string | null;
          known_issues?: string | null;
          repair_estimate?: number | null;
          inspection_notes?: string | null;
          photos?: string[];
          photo_count?: number;
          status?: VehicleStatus;
          rejection_reason?: string | null;
        };
        Update: Partial<Database['public']['Tables']['vehicles']['Insert']>;
      };
      auctions: {
        Row: {
          id: string;
          vehicle_id: string;
          dealer_id: string;
          starts_at: string;
          ends_at: string;
          starting_price: number;
          reserve_price: number;
          current_bid: number | null;
          bid_count: number;
          winning_bid_id: string | null;
          winner_id: string | null;
          status: AuctionStatus;
          buyer_premium_rate: number;
          listing_fee: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          vehicle_id: string;
          dealer_id: string;
          starts_at: string;
          ends_at: string;
          starting_price: number;
          reserve_price: number;
          current_bid?: number | null;
          bid_count?: number;
          winning_bid_id?: string | null;
          winner_id?: string | null;
          status?: AuctionStatus;
          buyer_premium_rate?: number;
          listing_fee?: number;
        };
        Update: Partial<Database['public']['Tables']['auctions']['Insert']>;
      };
      bids: {
        Row: {
          id: string;
          auction_id: string;
          bidder_id: string;
          amount: number;
          status: BidStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          auction_id: string;
          bidder_id: string;
          amount: number;
          status?: BidStatus;
        };
        Update: Partial<Database['public']['Tables']['bids']['Insert']>;
      };
      transactions: {
        Row: {
          id: string;
          auction_id: string;
          vehicle_id: string;
          buyer_id: string;
          dealer_id: string;
          sale_price: number;
          buyer_premium: number;
          listing_fee: number;
          total_buyer_pays: number;
          dealer_payout: number;
          stripe_payment_intent_id: string | null;
          stripe_transfer_id: string | null;
          status: TransactionStatus;
          paid_at: string | null;
          inspection_scheduled_at: string | null;
          inspection_completed_at: string | null;
          delivered_at: string | null;
          funds_released_at: string | null;
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          auction_id: string;
          vehicle_id: string;
          buyer_id: string;
          dealer_id: string;
          sale_price: number;
          buyer_premium: number;
          listing_fee: number;
          total_buyer_pays: number;
          dealer_payout: number;
          stripe_payment_intent_id?: string | null;
          stripe_transfer_id?: string | null;
          status?: TransactionStatus;
        };
        Update: Partial<Database['public']['Tables']['transactions']['Insert']>;
      };
      watchlist: {
        Row: {
          id: string;
          user_id: string;
          auction_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          auction_id: string;
        };
        Update: Partial<Database['public']['Tables']['watchlist']['Insert']>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          data: Record<string, unknown> | null;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          data?: Record<string, unknown> | null;
          read?: boolean;
        };
        Update: Partial<Database['public']['Tables']['notifications']['Insert']>;
      };
    };
    Functions: {
      place_bid: {
        Args: {
          p_auction_id: string;
          p_bidder_id: string;
          p_amount: number;
        };
        Returns: string;
      };
    };
    Enums: {
      user_role: UserRole;
      vehicle_status: VehicleStatus;
      auction_status: AuctionStatus;
      transaction_status: TransactionStatus;
      bid_status: BidStatus;
    };
  };
}
