// components/Workspace.js
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const Workspace = () => {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-background">
      <div className="border-dashed border-2 border-primary rounded-lg w-36 h-36 flex items-center justify-center cursor-pointer hover:bg-primary-lighter">
        <span className="text-primary font-bold text-3xl">+</span>
      </div>

      <Card className="w-36 h-36 bg-white flex flex-col justify-center items-center shadow-md">
        <CardContent>
          <img src="/path/to/icon.svg" alt="PDF Icon" className="w-8 h-8 mb-2" />
          <CardTitle className="text-text-primary text-sm font-semibold">
            File Name
          </CardTitle>
          <p className="text-text-secondary text-xs">Uploaded Date</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Workspace;
