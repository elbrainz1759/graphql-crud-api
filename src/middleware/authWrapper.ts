import { GraphQLFieldResolver } from "graphql";

export function authWrapper(
  resolver: GraphQLFieldResolver<any, any>,
  requiredRoles: ("user" | "admin" | "superAdmin")[] = []
): GraphQLFieldResolver<any, any> {
  return (parent, args, context, info) => {
    const user = context.user;

    if (!user) {
      throw new Error("Unauthorized: No user logged in");
    }

    if (requiredRoles.length && !requiredRoles.includes(user.role)) {
      throw new Error("Forbidden: You do not have permission to perform this action");
    }

    return resolver(parent, args, context, info);
  };
}
