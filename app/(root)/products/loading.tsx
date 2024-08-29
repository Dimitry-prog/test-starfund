import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

const Loading = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="flex animate-pulse flex-col overflow-hidden">
          <div className="aspect-video w-full bg-gray-300" />
          <CardHeader>
            <CardTitle>
              <div className="h-6 w-3/4 rounded-full bg-gray-300" />
            </CardTitle>
            <CardDescription>
              <div className="h-4 w-1/2 rounded-full bg-gray-300" />
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="h-4 w-full rounded-full bg-gray-300" />
            <div className="h-4 w-full rounded-full bg-gray-300" />
            <div className="h-4 w-3/4 rounded-full bg-gray-300" />
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled size="lg"></Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Loading;
