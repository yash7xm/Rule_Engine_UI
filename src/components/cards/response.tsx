import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

function Response({ res }: any) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">View Response</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Response</DialogTitle>
                    <DialogDescription>
                        You can see the response of the API here
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                    {JSON.stringify(res, null, 2)}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

export default Response;
