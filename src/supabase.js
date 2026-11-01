import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://mwdtshaomzrlpxkwtdiw.supabase.co' // Ex: https://xyz.supabase.co
const SUPABASE_ANON_KEY = 'sb_publishable_3tSTa8v94aOayyc8koBtrQ_6SarRyP1'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)