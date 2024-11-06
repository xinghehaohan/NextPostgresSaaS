import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  date,
  decimal,
  numeric,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 20 }).notNull().default('member'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  stripeCustomerId: text('stripe_customer_id').unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripeProductId: text('stripe_product_id'),
  planName: varchar('plan_name', { length: 50 }),
  subscriptionStatus: varchar('subscription_status', { length: 20 }),
});

export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  role: varchar('role', { length: 50 }).notNull(),
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
});

export const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  userId: integer('user_id').references(() => users.id),
  action: text('action').notNull(),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
  ipAddress: varchar('ip_address', { length: 45 }),
});

export const invitations = pgTable('invitations', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  email: varchar('email', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull(),
  invitedBy: integer('invited_by')
    .notNull()
    .references(() => users.id),
  invitedAt: timestamp('invited_at').notNull().defaultNow(),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
});

export const teamsRelations = relations(teams, ({ many }) => ({
  teamMembers: many(teamMembers),
  activityLogs: many(activityLogs),
  invitations: many(invitations),
}));

export const usersRelations = relations(users, ({ many }) => ({
  teamMembers: many(teamMembers),
  invitationsSent: many(invitations),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  team: one(teams, {
    fields: [invitations.teamId],
    references: [teams.id],
  }),
  invitedBy: one(users, {
    fields: [invitations.invitedBy],
    references: [users.id],
  }),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  team: one(teams, {
    fields: [activityLogs.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

export const stocks_analysis = pgTable('stocks_analysis', {
  sector: varchar('sector', { length: 255 }),
  analyst: varchar('analyst', { length: 255 }),
  coverage_date: date('coverage_date'),
  rating: varchar('rating', { length: 255 }),
  analysis: text('analysis'),
});

export const topPerforming = pgTable('top_performing', {
  id: serial('id').primaryKey(),
  rank: varchar('rank', { length: 255 }).notNull(),
  analyst: varchar('analyst', { length: 255 }).notNull(),
  analystImg: text('analyst_img'),
  successRate: varchar('success_rate', { length: 10 }).notNull(),
  averageReturn: varchar('average_return', { length: 10 }).notNull(),
  numberOfRatings: varchar('number_of_ratings', { length: 50 }).notNull(),
  latestCoverageStock: varchar('latest_coverage_stock', { length: 10 }),
  latestCoverageArticle: text('latest_coverage_article'),
  coverageDate: varchar('coverage_date', { length: 20 }),
  latestRating: varchar('latest_rating', { length: 20 }),
});

export const panteraPicks = pgTable('pantera_picks', {
  id: serial('id').primaryKey(),
  company: text('company').notNull(),
  companyLogoUrl: text('company_logo_url'),
  symbol: varchar('symbol', { length: 10 }).notNull(),
  symbolHref: text('symbol_href'),
  pickedDate: date('picked_date').notNull(),
  purchasePrice: numeric('purchase_price', { precision: 10, scale: 2 }).notNull(),
  closedDate: text('closed_date'),
  sellPrice: text('sell_price'),
  returnPercentage: text('return_percentage'),
  spyPercentage: text('spy_percentage'),
  differencePercentage: text('difference_percentage'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});


export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;
export type TeamDataWithMembers = Team & {
  teamMembers: (TeamMember & {
    user: Pick<User, 'id' | 'name' | 'email'>;
  })[];
};

export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_TEAM = 'CREATE_TEAM',
  REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER',
  INVITE_TEAM_MEMBER = 'INVITE_TEAM_MEMBER',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
}

export type TopPerforming = typeof topPerforming.$inferSelect;
export type NewTopPerforming = typeof topPerforming.$inferInsert;
export type PanteraPick = typeof panteraPicks.$inferSelect;
export type NewPanteraPick = typeof panteraPicks.$inferInsert;

export interface TransformedPanteraPick {
  id: number;
  company: string;
  companyLogoUrl: string | null;
  symbol: string;
  symbolHref: string | null;
  pickedDate: string;
  purchasePrice: number;
  closedDate: string | null;
  sellPrice: string | null;
  returnPercentage: string | null;
  spyPercentage: string | null;
  differencePercentage: string | null;
}
