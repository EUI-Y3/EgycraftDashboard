import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pmznzggxetghnrlwlkig.supabase.co'
const supabaseKey = 'sb_publishable_Q_KaKA9N1lNoNp0MJtIHxQ_f3PKbDpN'

export const supabase = createClient(supabaseUrl, supabaseKey)
