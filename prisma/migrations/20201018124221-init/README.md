# Migration `20201018124221-init`

This migration has been generated by woony at 10/18/2020, 9:42:21 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `UserMarketer` ADD COLUMN `company_id` varchar(191)  NOT NULL 
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201018103602-init..20201018124221-init
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
@@ -62,8 +62,9 @@
   userId String
   company_cate  String
   company_name  String
+  company_id    String
   company_certi String
   product Product[]
 }
```

