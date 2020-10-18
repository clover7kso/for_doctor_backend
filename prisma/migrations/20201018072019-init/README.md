# Migration `20201018072019-init`

This migration has been generated by woony at 10/18/2020, 4:20:19 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `User_Doctor` DROP FOREIGN KEY `User_Doctor_ibfk_1`

ALTER TABLE `User_Marketer` DROP FOREIGN KEY `User_Marketer_ibfk_1`

ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_ibfk_3`

ALTER TABLE `Post` DROP FOREIGN KEY `Post_ibfk_1`

ALTER TABLE `Product` DROP FOREIGN KEY `Product_ibfk_1`

ALTER TABLE `likeProduct` DROP FOREIGN KEY `likeProduct_ibfk_3`

CREATE TABLE `UserDoctor` (
`id` varchar(191)  NOT NULL ,
`userId` varchar(191)  NOT NULL ,
`medical_cate` varchar(191)  NOT NULL ,
`medical_id` varchar(191)  NOT NULL ,
`medical_certi` varchar(191)  NOT NULL ,
UNIQUE INDEX `UserDoctor.medical_id_medical_cate_unique`(`medical_id`,
`medical_cate`),
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `UserMarketer` (
`id` varchar(191)  NOT NULL ,
`userId` varchar(191)  NOT NULL ,
`company_cate` varchar(191)  NOT NULL ,
`company_name` varchar(191)  NOT NULL ,
`company_certi` varchar(191)  NOT NULL ,
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

ALTER TABLE `UserDoctor` ADD FOREIGN KEY (`userId`) REFERENCES `Doctor`.`User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `UserMarketer` ADD FOREIGN KEY (`userId`) REFERENCES `Doctor`.`User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `Comment` ADD FOREIGN KEY (`userId`) REFERENCES `Doctor`.`UserDoctor`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `Post` ADD FOREIGN KEY (`userId`) REFERENCES `Doctor`.`UserDoctor`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `Product` ADD FOREIGN KEY (`marketerId`) REFERENCES `Doctor`.`UserMarketer`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE `likeProduct` ADD FOREIGN KEY (`userId`) REFERENCES `Doctor`.`UserDoctor`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE

DROP TABLE `User_Doctor`

DROP TABLE `User_Marketer`
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201018063307-init..20201018072019-init
--- datamodel.dml
+++ datamodel.dml
@@ -4,9 +4,9 @@
 }
 datasource db {
   provider = "mysql"
-  url = "***"
+  url = "***"
 }
 model HomeAD {
   id        String    @id @default(cuid())
@@ -35,13 +35,13 @@
   inbox  Message[] @relation("MessageReceiver")
   outbox Message[] @relation("MessageSender")
   rooms  Room[]    @relation(name: "RoomParticipants")
-  User_Doctor   User_Doctor[]   @relation("userDoctorId")
-  User_Marketer User_Marketer[] @relation("userMarketId")
+  UserDoctor   UserDoctor[]   @relation("userDoctorId")
+  UserMarketer UserMarketer[] @relation("userMarketId")
 }
-model User_Doctor {
+model UserDoctor {
   id     String @id @default(cuid())
   user   User   @relation(name: "userDoctorId", fields: [userId], references: [id])
   userId String
@@ -55,9 +55,9 @@
   @@unique([medical_id, medical_cate])
 }
-model User_Marketer {
+model UserMarketer {
   id     String @id @default(cuid())
   user   User   @relation(name: "userMarketId", fields: [userId], references: [id])
   userId String
@@ -68,13 +68,13 @@
   product Product[]
 }
 model Post {
-  id        String      @id @default(cuid())
-  user      User_Doctor @relation(name: "PostAuthor", fields: [userId], references: [userId])
+  id        String     @id @default(cuid())
+  user      UserDoctor @relation(name: "PostAuthor", fields: [userId], references: [userId])
   userId    String
-  updatedAt DateTime    @default(now()) @updatedAt
-  createdAt DateTime    @default(now())
+  updatedAt DateTime   @default(now()) @updatedAt
+  createdAt DateTime   @default(now())
   category   String
   title      String
   content    String
@@ -83,13 +83,13 @@
   comments   Comment[]
 }
 model Comment {
-  id        String      @id @default(cuid())
-  user      User_Doctor @relation(name: "CommentAuthor", fields: [userId], references: [userId])
+  id        String     @id @default(cuid())
+  user      UserDoctor @relation(name: "CommentAuthor", fields: [userId], references: [userId])
   userId    String
-  createdAt DateTime    @default(now())
-  updatedAt DateTime    @default(now()) @updatedAt
+  createdAt DateTime   @default(now())
+  updatedAt DateTime   @default(now()) @updatedAt
   text   String
   post   Post   @relation(fields: [postId], references: [id])
   postId String
@@ -100,9 +100,9 @@
   updatedAt DateTime  @default(now()) @updatedAt
   createdAt DateTime  @default(now())
   expireAt  DateTime?
-  Marketer   User_Marketer? @relation(fields: [marketerId], references: [userId])
+  Marketer   UserMarketer? @relation(fields: [marketerId], references: [userId])
   marketerId String?
   mainCategory String
   subCategory  String?
@@ -141,11 +141,11 @@
   createdAt DateTime @default(now())
   updatedAt DateTime @default(now()) @updatedAt
   userId    String
-  user      User_Doctor @relation(fields: [userId], references: [userId])
+  user      UserDoctor @relation(fields: [userId], references: [userId])
   productId String
-  product   Product     @relation(fields: [productId], references: [id])
+  product   Product    @relation(fields: [productId], references: [id])
 }
 model Room {
   createdAt    DateTime  @default(now())
```

