// utils/withAuth.ts
import { GraphQLFieldResolver } from "graphql";

type Role = "user" | "admin" | "superAdmin";

export function withAuth<TSource = any, TArgs = any>(
  resolver: GraphQLFieldResolver<TSource, any, TArgs>,
  requiredRole?: Role
): GraphQLFieldResolver<TSource, any, TArgs> {
  return (parent, args, context, info) => {
    const user = context.user;
    if (!user) {
      console.log("Unauthorized: No user in context");
      return null;
    }

    if (
      requiredRole &&
      (user.role !== requiredRole && user.role !== "superAdmin")
    ) {
      console.log("Forbidden: Insufficient role");
      return null;
    }

    return resolver(parent, args, context, info);
  };
}
