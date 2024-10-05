import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform, Linking } from "react-native";

interface ExternalLinkProps {
  href: string;
  // ... other props
}

export function ExternalLink({ href, ...rest }: ExternalLinkProps) {
  return (
    <Link
      {...rest}
      href={href as any} // Type assertion to bypass type check
      onPress={async (event) => {
        if (Platform.OS !== "web") {
          event.preventDefault();
          await Linking.openURL(href);
        }
      }}
    />
  );
}
