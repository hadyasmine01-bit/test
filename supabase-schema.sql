-- ==============================================================================
-- SCHEMA SUPABASE POUR CONTROL AND STUDY (CTRL S)
-- À copier et exécuter dans le "SQL Editor" de votre tableau de bord Supabase
-- ==============================================================================

-- 1. Table des Salles et Collaboration (Salon Public & Salles privées)
CREATE TABLE IF NOT EXISTS public.rooms (
  room_id TEXT PRIMARY KEY,
  room_name TEXT,
  participants JSONB DEFAULT '[]'::jsonb,
  sticky_notes JSONB DEFAULT '[]'::jsonb,
  shared_tasks JSONB DEFAULT '[]'::jsonb,
  space_moments JSONB DEFAULT '[]'::jsonb,
  synced_timer JSONB DEFAULT '{"isRunning": false, "mode": "pomodoro", "timeLeft": 1500, "durationSecs": 1500, "updatedBy": "System"}'::jsonb,
  last_updated BIGINT DEFAULT (extract(epoch from now()) * 1000)::bigint
);

-- Initialisation du Salon Public (PUBLIC) propre, sans fausses photos
INSERT INTO public.rooms (room_id, room_name, participants, sticky_notes, shared_tasks, space_moments)
VALUES (
  'PUBLIC',
  'Salon Public Général CTRL S',
  '[]'::jsonb,
  '[
    {"id": 1, "author": "Équipe CTRL S", "content": "Bienvenue dans le Salon Public ! Partagez vos mémos et vos photos de révision.", "color": "orange", "date": "Aujourd hui"}
  ]'::jsonb,
  '[
    {"id": 1, "text": "Réviser les fiches de cours", "done": false, "tag": "Examen", "priority": "urgent"}
  ]'::jsonb,
  '[]'::jsonb
)
ON CONFLICT (room_id) DO NOTHING;

-- 2. Table des Statistiques et Cycles d'Étude des Utilisateurs
CREATE TABLE IF NOT EXISTS public.user_stats (
  user_id TEXT PRIMARY KEY,
  stats JSONB NOT NULL,
  updated_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::bigint
);

-- 3. Table des Tâches et Objectifs Personnels
CREATE TABLE IF NOT EXISTS public.user_tasks (
  user_id TEXT PRIMARY KEY,
  tasks JSONB NOT NULL,
  updated_at BIGINT DEFAULT (extract(epoch from now()) * 1000)::bigint
);

-- 4. Bucket de Stockage Cloud pour les Photos réelles des Coworkers
INSERT INTO storage.buckets (id, name, public)
VALUES ('moments', 'moments', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 5. Politiques de Sécurité (RLS) ouvertes pour collaboration multi-utilisateurs
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Accès complet aux salons" ON public.rooms;
CREATE POLICY "Accès complet aux salons" ON public.rooms FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Accès complet aux stats" ON public.user_stats;
CREATE POLICY "Accès complet aux stats" ON public.user_stats FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE public.user_tasks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Accès complet aux tâches" ON public.user_tasks;
CREATE POLICY "Accès complet aux tâches" ON public.user_tasks FOR ALL USING (true) WITH CHECK (true);

-- Politiques de Stockage pour le bucket 'moments'
DROP POLICY IF EXISTS "Lecture publique des photos" ON storage.objects;
CREATE POLICY "Lecture publique des photos" ON storage.objects FOR SELECT USING (bucket_id = 'moments');

DROP POLICY IF EXISTS "Téléversement public des photos" ON storage.objects;
CREATE POLICY "Téléversement public des photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'moments');

DROP POLICY IF EXISTS "Suppression des photos" ON storage.objects;
CREATE POLICY "Suppression des photos" ON storage.objects FOR DELETE USING (bucket_id = 'moments');
