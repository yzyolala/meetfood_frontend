import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import { AuthenticatorRoute } from "@aws-amplify/ui";
import { FC, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";

interface CustomizedAuthenticatorProps {
  children: ReactNode;
}

type AuthGuardProps = CustomizedAuthenticatorProps;

export const CustomizedAuthenticator: FC<CustomizedAuthenticatorProps> = ({
  children,
}) => {
  const { route, user } = useAuthenticator((context) => [context.route]);
  const [prevRoute, setPrevRoute] = useState<AuthenticatorRoute>("idle");

  useEffect(() => {
    // user complete sign up
    if (prevRoute === "transition" && route === "authenticated") {
      const accessToken = user
        ?.getSignInUserSession()
        ?.getAccessToken()
        .getJwtToken();

      axios.post(
        `${BASE_URL}/api/v1/user/new`,
        {
          email: user.attributes?.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "cognito-token": accessToken,
          },
        }
      );
    }

    setPrevRoute(route);
  }, [route]);

  return (
    <Authenticator
      // will wrap every subcomponent
      Container={(props) => (
        // reuse default `Container` and apply custom background
        <Authenticator.Container {...props} />
      )}
      // will render on every subcomponent
      components={{
        SignIn: ({ fields, ...props }) => {
          const customizedSigninFields = [...fields];
          customizedSigninFields[0] = {
            name: "username",
            label: "Email",
            placeholder: "Enter your email address",
            required: true,
            type: "email",
          };

          return (
            <Authenticator.SignIn {...props} fields={customizedSigninFields} />
          );
        },
        SignUp: ({ fields, ...props }) => {
          const customizedSignupFields = [...fields];
          customizedSignupFields[0] = {
            name: "username",
            label: "Email",
            placeholder: "Enter your email address",
            required: true,
            type: "email",
          };

          customizedSignupFields.push({
            name: "family_name",
            label: "Last name",
            placeholder: "Enter your last name",
            type: "default",
          });

          customizedSignupFields.push({
            name: "given_name",
            label: "First name",
            placeholder: "Enter your first name",
            type: "default",
          });

          return (
            <Authenticator.SignUp {...props} fields={customizedSignupFields} />
          );
        },
      }}
    >
      {children}
    </Authenticator>
  );
};

export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  return (
    <Authenticator.Provider>
      <CustomizedAuthenticator>{children}</CustomizedAuthenticator>
    </Authenticator.Provider>
  );
};
