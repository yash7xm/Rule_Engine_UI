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

function EvaluateRule() {
    const [ast, setAst] = useState(`{
        "Type": "LogicalAndExpression",
        "Value": "AND",
        "Left": {
            "Type": "BinaryExpression",
            "Value": ">",
            "Left": {
                "Type": "Identifier",
                "Value": "age",
                "Left": null,
                "Right": null
            },
            "Right": {
                "Type": "NumericLiteral",
                "Value": "30",
                "Left": null,
                "Right": null
            }
        },
        "Right": {
            "Type": "BinaryExpression",
            "Value": "=",
            "Left": {
                "Type": "Identifier",
                "Value": "department",
                "Left": null,
                "Right": null
            },
            "Right": {
                "Type": "StringLiteral",
                "Value": "'Sales'",
                "Left": null,
                "Right": null
            }
        }
    }`);

    const [data, setData] = useState(
        '{"age": "35", "department": "Sales", "salary": "60000", "experience": "3"}'
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
                        ast: JSON.parse(ast),
                        data: JSON.parse(data),
                    }),
                }
            );

            if (!response.ok) {
                const errorResponse = await response.json();
                setResponseMessage(errorResponse.error);
                toast.error(`${errorResponse.message}`);
                return;
            }

            const res = await response.json();
            setResponseMessage(res.data.result);
            toast.success(`${res.message}`);
        } catch (error: any) {
            toast.error(`Error: ${error.message}`);
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
                        <Label htmlFor="ast">AST</Label>
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
                <CardFooter className="flex justify-between">
                    <Button onClick={handleCreateRule}>Evaluate</Button>
                    <Response res={responseMessage} />
                </CardFooter>
            </Card>
        </>
    );
}

export default EvaluateRule;
