import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mdhnugcxvfmnbrziosnk.supabase.co'
const supabaseKey = 'sb_publishable_q8sFY6ojOCcAetp2k35mVA_DHLfYRgb'

export const supabase = createClient(supabaseUrl, supabaseKey)