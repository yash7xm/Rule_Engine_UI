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

function CombineRules() {
    const [ruleName, setRuleName] = useState("combine_rule1");
    const [ruleString, setRuleString] = useState(
        "age > 30 , department = 'Sales'"
    );
    const [responseMessage, setResponseMessage] = useState("");

    const handleCreateRule = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/combine_rules",
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
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data)
            setResponseMessage(
                `Rule created successfully with ID: ${data.rule_id}`
            );
        } catch (error: any) {
            setResponseMessage(`Failed to create rule: ${error.message}`);
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
                <CardFooter>
                    <Button onClick={handleCreateRule}>Create</Button>
                </CardFooter>
            </Card>

            {responseMessage && <p>{responseMessage}</p>}
        </>
    );
}

export default CombineRules;
