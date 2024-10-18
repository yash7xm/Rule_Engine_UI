import { useState } from "react";
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
import { toast } from "sonner";
import Response from "./response";

function CombineRules() {
    const [ruleName, setRuleName] = useState("combine_rule1");
    const [ruleString, setRuleString] = useState(
        "age > 30 , department = 'Sales'"
    );
    const [responseMessage, setResponseMessage] = useState("");

    const handleCreateRule = async () => {
        try {
            const response = await fetch(
                "https://rule-engine-with-ast-skiu.onrender.com/combine_rules",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        rules: ruleString.split(","),
                    }),
                }
            );

            if (!response.ok) {
                const errorResponse = await response.json();
                setResponseMessage(errorResponse.error);
                toast(`${errorResponse.message}`);
                return;
            }

            const res = await response.json();
            setResponseMessage(res.data.node);
            toast(`${res.message}`);
        } catch (error: any) {
            toast(`${error.message}`);
        }
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Combine Rules</CardTitle>
                    <CardDescription>
                        Provide comma separated rules to be combined
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={ruleName}
                            onChange={(e) => setRuleName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="ruleString">Rule</Label>
                        <Input
                            id="ruleString"
                            value={ruleString}
                            onChange={(e) => setRuleString(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={handleCreateRule}>Create</Button>
                    <Response res={responseMessage} />
                </CardFooter>
            </Card>
        </>
    );
}

export default CombineRules;
