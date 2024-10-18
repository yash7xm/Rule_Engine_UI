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

function EvaluateRule() {
    const [ast, setAst] = useState("age > 30 AND department = 'Sales'");
    const [data, setData] = useState(
        '{"age": 35, "department": "Sales", "salary": 60000, "experience": 3}'
    );
    const [responseMessage, setResponseMessage] = useState("");

    const handleCreateRule = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/evaluate_rule",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ast: ast,
                        data: data,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const res = await response.json();
            console.log(res);
            setResponseMessage(
                `Rule created successfully with ID: ${res.rule_id}`
            );
        } catch (error: any) {
            console.log(error)
            setResponseMessage(`Failed to create rule: ${error.message}`);
        }
    };

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
                        <Input
                            id="ast"
                            value={ast}
                            onChange={(e) => setAst(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="data">Data</Label>
                        <Input
                            id="data"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleCreateRule}>Evaluate</Button>
                </CardFooter>
            </Card>

            {responseMessage && <p>{responseMessage}</p>}
        </>
    );
}

export default EvaluateRule;
