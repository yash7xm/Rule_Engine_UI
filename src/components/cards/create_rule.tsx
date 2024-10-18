import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function CreateRule() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Create Rule</CardTitle>
                    <CardDescription>Add your rule here</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="rule1" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="username">Rule</Label>
                        <Input
                            id="username"
                            defaultValue="age > 30 AND department = 'Sales'"
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Create</Button>
                </CardFooter>
            </Card>
        </>
    );
}

export default CreateRule;
