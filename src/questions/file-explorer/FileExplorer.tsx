import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, File, Folder } from "lucide-react";
import MyFolder from "./MyFolder";
import { useState } from "react";
import { folders } from "./data";

export type IFolder = {
  name: string;
  folders?: IFolder[];
};
export default function FileExplorer() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="p-8">
      <Link to="/" className="text-blue-600 hover:underline">
        ← Back to Home
      </Link>
      <h2 className="text-2xl font-bold mt-4">File Explorer</h2>

      <div className="mt-4">
        <div className="pl-5">
          {folders.map((folder) => {
            return (
              <div key={folder.name} className="pt-1">
                {folder?.folders ? (
                  <>
                    {isExpanded ? (
                      <ChevronDown
                        onClick={() => setIsExpanded((prev) => !prev)}
                        className="inline pr-1"
                        size={20}
                      />
                    ) : (
                      <ChevronRight
                        onClick={() => setIsExpanded((prev) => !prev)}
                        className="inline pr-1"
                        size={20}
                      />
                    )}
                    <Folder className="inline pr-1" color="#f5b301" size={20} />
                  </>
                ) : (
                  <File
                    className="inline pr-1 text-gray-700"
                    color="#6b7280"
                    size={20}
                  />
                )}
                {folder.name}
                {isExpanded &&
                  folder?.folders?.map((folder) => {
                    return <MyFolder key={folder.name} folder={folder} />;
                  })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
