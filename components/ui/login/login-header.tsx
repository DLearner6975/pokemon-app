import React from 'react';
import { Bell, Calendar, ChevronDown, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from './login-modal';

interface LoginHeaderProps {
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export function LoginHeader({
  user,
  onLoginClick,
  onLogout,
}: LoginHeaderProps) {
  return (
    <div className="flex items-center gap-6">
      <Button variant="ghost" size="icon">
        <Calendar className="h-5 w-5 text-[#787486]" />
      </Button>
      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5 text-[#787486]" />
      </Button>
      <Separator orientation="vertical" className="h-6" />
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar>
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <div className="font-medium">{user.name}</div>
                <div className="text-[#787486]">{user.location}</div>
              </div>
              <ChevronDown className="h-4 w-4 text-[#787486]" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={onLoginClick}>Log in</Button>
      )}
    </div>
  );
}
