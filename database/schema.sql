set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
--   pgweb --db=anime-fans-with-react
--   http://localhost:8081
drop schema "public" cascade;
create schema "public";

 CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'now()',
	"birthday" TEXT NOT NULL,
	"gender" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "favorites" (
	"userId" integer NOT NULL,
	"favoriteId" serial NOT NULL,
	"title" TEXT NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "animesReviewed" (
	"userId" integer NOT NULL,
	"entryId" serial NOT NULL,
	"title" TEXT NOT NULL,
	"description" TEXT NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "animesReviewed" ADD CONSTRAINT "animesReviewed_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");




--  CREATE TABLE "users" (
-- 	"userId" serial NOT NULL,
-- 	"firstName" TEXT NOT NULL,
-- 	"lastName" TEXT NOT NULL,
-- 	"email" TEXT NOT NULL UNIQUE,
-- 	"hashedPassword" TEXT NOT NULL,
-- 	"createdAt" TIMESTAMP NOT NULL DEFAULT 'now()',
--   "birthday" TEXT NOT NULL,
-- 	"gender" TEXT NOT NULL,
-- 	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
-- ) WITH (
--   OIDS=FALSE
-- );


-- CREATE TABLE "entries" (
-- 	"userId" integer NOT NULL,
-- 	"entryId" serial NOT NULL,
-- 	"title" TEXT NOT NULL,
-- 	"photoUrl" TEXT NOT NULL,
-- 	"notes" TEXT NOT NULL
-- ) WITH (
--   OIDS=FALSE
-- );




-- ALTER TABLE "entries" ADD CONSTRAINT "entries_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
