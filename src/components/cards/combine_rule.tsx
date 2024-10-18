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

function CombineRules() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Combine Rules</CardTitle>
                    <CardDescription>
                        Provide comma separated rules to be comined
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="combine_rule1" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="username">Rule</Label>
                        <Input
                            id="username"
                            defaultValue="age > 30 , department = 'Sales'"
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Combine & Create</Button>
                </CardFooter>
            </Card>{" "}
        </>
    );
}

export default CombineRules;
