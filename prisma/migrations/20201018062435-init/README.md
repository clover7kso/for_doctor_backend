# Migration `20201018062435-init`

This migration has been generated by woony at 10/18/2020, 3:24:35 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201018062332-init..20201018062435-init
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
@@ -35,15 +35,15 @@
   inbox  Message[] @relation("MessageReceiver")
   outbox Message[] @relation("MessageSender")
   rooms  Room[]    @relation(name: "RoomParticipants")
-  User_Doctor   User_Doctor[]   @relation("userId")
-  User_Marketer User_Marketer[] @relation("userId")
+  User_Doctor   User_Doctor[]   @relation("userDoctorId")
+  User_Marketer User_Marketer[] @relation("userMarketId")
 }
 model User_Doctor {
   id     String @id @default(cuid())
-  user   User   @relation(name: "userId", fields: [userId], references: [id])
+  user   User   @relation(name: "userDoctorId", fields: [userId], references: [id])
   userId String
   medical_cate  String
   medical_id    String
@@ -57,9 +57,9 @@
 }
 model User_Marketer {
   id     String @id @default(cuid())
-  user   User   @relation(name: "userId", fields: [userId], references: [id])
+  user   User   @relation(name: "userMarketId", fields: [userId], references: [id])
   userId String
   company_name  String
   company_certi String
```

