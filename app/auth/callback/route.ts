import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const redirect = searchParams.get('redirect');

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Get user profile to determine redirect
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single() as { data: { role: string } | null };

        if (redirect) {
          return NextResponse.redirect(`${origin}${redirect}`);
        } else if (profile?.role === 'dealer') {
          return NextResponse.redirect(`${origin}/dealer/dashboard`);
        } else if (profile?.role === 'admin') {
          return NextResponse.redirect(`${origin}/admin/dashboard`);
        }
      }
      return NextResponse.redirect(`${origin}/browse`);
    }
  }

  // Auth error — redirect to login with error
  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
