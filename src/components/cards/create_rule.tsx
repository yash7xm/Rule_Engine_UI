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

function CreateRule() {
    const [ruleName, setRuleName] = useState("rule1");
    const [ruleString, setRuleString] = useState(
        "age > 30 AND department = 'Sales'"
    );
    const [responseMessage, setResponseMessage] = useState("");

    const handleCreateRule = async () => {
        try {
            const response = await fetch("http://localhost:8080/create_rule", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rule_string: ruleString,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);
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
                    <CardTitle>Create Rule</CardTitle>
                    <CardDescription>Add your rule here</CardDescription>
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

export default CreateRule;
