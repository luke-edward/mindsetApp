import * as React from "react";
import { Text, View } from "react-native";
import { TextClassContext } from "./text";
import { TextRef, ViewRef } from "@rn-primitives/types";
import { cn } from "@/~/lib/utils";

const Card = React.forwardRef<
  ViewRef,
  React.ComponentPropsWithoutRef<typeof View>
>(({ ...props }, ref) => <View ref={ref} {...props} />);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  ViewRef,
  React.ComponentPropsWithoutRef<typeof View>
>(({ ...props }, ref) => <View ref={ref} {...props} />);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  TextRef,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ ...props }, ref) => (
  <Text role="heading" aria-level={3} ref={ref} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  TextRef,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ ...props }, ref) => <Text ref={ref} {...props} />);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  ViewRef,
  React.ComponentPropsWithoutRef<typeof View>
>(({ ...props }, ref) => (
  <TextClassContext.Provider value="text-card-foreground">
    <View ref={ref} {...props} />
  </TextClassContext.Provider>
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  ViewRef,
  React.ComponentPropsWithoutRef<typeof View>
>(({ ...props }, ref) => <View ref={ref} {...props} />);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
