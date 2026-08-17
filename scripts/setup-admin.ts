/**
 * Admin Account Setup Script
 * Run with: bun run scripts/setup-admin.ts
 * 
 * This script creates a test admin account in Supabase
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  console.error('❌ Error: VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY environment variables are required');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function setupAdmin() {
  console.log('\n╭──────────────────────────────────╮');
  console.log('│  SACCO-SOKO Admin Setup Script   │');
  console.log('╰──────────────────────────────────╝\n');

  try {
    // Use predefined admin credentials
    const email = 'admin@sacco-soko.local';
    const password = '#Admin2026';
    const fullName = 'ADMIN';
    const businessName = 'SACCO-SOKO Admin';

    console.log('📋 Using predefined admin credentials:');
    console.log(`  📧 Email: ${email}`);
    console.log(`  👤 Full Name: ${fullName}`);
    console.log(`  🏢 Business: ${businessName}\n`);

    console.log('\n⏳ Creating admin account...\n');

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
    });

    if (authError) {
      console.error('❌ Error creating auth user:', authError.message);
      process.exit(1);
    }

    const userId = authData.user.id;
    console.log('✅ Auth user created');

    // Create user profile
    const { error: userError } = await supabase.from('users').insert({
      id: userId,
      email,
      full_name: fullName,
    });

    if (userError) {
      console.error('❌ Error creating user profile:', userError.message);
      process.exit(1);
    }

    console.log('✅ User profile created');

    // Create seller profile
    const { data: sellerData, error: sellerError } = await supabase
      .from('sellers')
      .insert({
        user_id: userId,
        business_name: businessName,
        business_email: email,
        verified: true,
      })
      .select();

    if (sellerError) {
      console.error('❌ Error creating seller profile:', sellerError.message);
      process.exit(1);
    }

    console.log('✅ Seller profile created');

    // Success message
    console.log('\n╭──────────────────────────────────╮');
    console.log('│   ✅ Setup Complete!             │');
    console.log('╰──────────────────────────────────╝\n');

    console.log('Admin Account Details:');
    console.log(`├─ Email: ${email}`);
    console.log(`├─ Password: ${password}`);
    console.log(`├─ Full Name: ${fullName}`);
    console.log(`├─ Business: ${businessName}`);
    console.log(`└─ User ID: ${userId}\n`);

    console.log('🔗 Login at: http://localhost:5173/admin\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }
}

setupAdmin();
