import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateRule from "@/components/cards/create_rule";
import CombineRules from "@/components/cards/combine_rule";
import EvaluateRule from "@/components/cards/evaluate_rule";

import { useEffect, useState } from "react";
import { toast } from "sonner";

function Home() {
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(() => {
        const callPing = async () => {
            try {
                const response = await fetch(
                    "https://rule-engine-with-ast-skiu.onrender.com/ping",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            ping: "PING",
                        }),
                    }
                );

                if (!response.ok) {
                    toast("Server has some internal error please refresh");
                    return;
                }

                setLoading(false);
                toast("Connected to server successfully");
            } catch (error: any) {
                setLoading(true);
                toast("Server has some internal error please refresh");
            }
        };

        callPing();
    }, []);

    return (
        <>
            <div className="w-screen h-screen flex-col justify-center items-center p-4">
                <div className="text-center text-2xl font-bold mb-8">
                    Rule Engine
                </div>
                <div className="w-1/2 h-4/5 mx-auto mt-8">
                    <Tabs defaultValue="create_rule" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="create_rule">
                                Create Rule
                            </TabsTrigger>
                            <TabsTrigger value="combine_rules">
                                Combine Rules
                            </TabsTrigger>
                            <TabsTrigger value="evaluate_rule">
                                Evaluate Rule
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="create_rule">
                            <CreateRule />
                        </TabsContent>
                        <TabsContent value="combine_rules">
                            <CombineRules />
                        </TabsContent>
                        <TabsContent value="evaluate_rule">
                            <EvaluateRule />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            {loading ? (
                <div>
                    Please wait while we are waking up server this might take
                    1-2 mins
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default Home;
