import React from 'react';
import { Checkbox } from 'src/components/ui/checkbox';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from 'src/components/ui/dialog';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from 'src/components/ui/dropdown-menu';
import { HoverCard, HoverCardTrigger, HoverCardContent } from 'src/components/ui/hover-card';
import { Popover, PopoverTrigger, PopoverContent } from 'src/components/ui/popover';
import { Toaster } from 'src/components/ui/sonner';
import { Textarea } from 'src/components/ui/textarea';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from 'src/components/ui/tooltip';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from 'src/components/ui/card';
import { Calendar } from 'src/components/ui/calendar';
import { Button } from 'src/components/ui/button';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from 'src/components/ui/breadcrumb';
import { Badge } from 'src/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from 'src/components/ui/avatar';
import { AspectRatio } from 'src/components/ui/aspect-ratio';
import { Alert, AlertTitle, AlertDescription } from 'src/components/ui/alert';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from 'src/components/ui/alert-dialog';

function App() {
    return (
        <div className="App">
            <Checkbox />
            <Dialog>
                <DialogTrigger>Open Dialog</DialogTrigger>
                <DialogContent>
                    <DialogTitle>Dialog Title</DialogTitle>
                    <DialogDescription>Dialog Description</DialogDescription>
                </DialogContent>
            </Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Item 1</DropdownMenuItem>
                    <DropdownMenuItem>Item 2</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <HoverCard>
                <HoverCardTrigger>Hover over me</HoverCardTrigger>
                <HoverCardContent>Hover Card Content</HoverCardContent>
            </HoverCard>
            <Popover>
                <PopoverTrigger>Open Popover</PopoverTrigger>
                <PopoverContent>Popover Content</PopoverContent>
            </Popover>
            <Toaster />
            <Textarea placeholder="Type here..." />
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>Hover over me</TooltipTrigger>
                    <TooltipContent>Tooltip Content</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>Card Content</CardContent>
                <CardFooter>Card Footer</CardFooter>
            </Card>
            <Calendar />
            <Button>Click Me</Button>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Current Page</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Badge>Badge</Badge>
            <Avatar>
                <AvatarImage src="path/to/image.jpg" />
                <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <AspectRatio ratio={16 / 9}>
                <div>Aspect Ratio Content</div>
            </AspectRatio>
            <Alert>
                <AlertTitle>Alert Title</AlertTitle>
                <AlertDescription>Alert Description</AlertDescription>
            </Alert>
            <AlertDialog>
                <AlertDialogTrigger>Open Alert Dialog</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogTitle>Alert Dialog Title</AlertDialogTitle>
                    <AlertDialogDescription>Alert Dialog Description</AlertDialogDescription>
                    <AlertDialogAction>Confirm</AlertDialogAction>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default App;