ALTER TABLE "case01_questions" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "case01_questions" CASCADE;--> statement-breakpoint
CREATE INDEX "puzzle_events_timeline_user_idx" ON "puzzle_events" USING btree ("timeline_id","user_id");