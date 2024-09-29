import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { auth } from "@config/firebase";
import { useAuthSignOut, useAuthUser } from "@hooks/firebase/auth";
import { Link } from "react-router-dom";

export default function UserAvatarMenu() {
  const user = useAuthUser(auth);
  const { mutate: signOut } = useAuthSignOut(auth);
  return (
    <>
      {user.data ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Avatar>
                <AvatarImage
                  src={user.data.photoURL ?? undefined}
                  alt="profile image"
                />
                <AvatarFallback>
                  {user.data.displayName
                    ? user.data.displayName
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                    : "User"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/dashboard/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild>
          <Link to="/signin">Log In</Link>
        </Button>
      )}
    </>
  );
}
