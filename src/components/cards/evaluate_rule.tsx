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

function EvaluateRule() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Evaluate Rule</CardTitle>
                    <CardDescription>
                        Provide combined rule's AST and a dictionary data
                        containing attributes.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="name">AST</Label>
                        <Input id="name" defaultValue="combine_rule1" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="username">Data</Label>
                        <Input
                            id="data"
                            defaultValue='{"age": 35, "department": "Sales", "salary": 60000, "experience": 3}'
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Save password</Button>
                </CardFooter>
            </Card>{" "}
        </>
    );
}

export default EvaluateRule;
