import { ChevronDown, ChevronRight, File, Folder } from "lucide-react";
import type { IFolder } from "./FileExplorer";
import { useState } from "react";
function MyFolder({ folder }: { folder: IFolder }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="pl-5 pt-1" key={folder.name}>
      {folder?.folders ? (
        <>
          {folder?.folders?.length > 0 && (
            <span>
              {isExpanded ? (
                <ChevronDown
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className="inline pr-1 cursor-pointer"
                  size={20}
                />
              ) : (
                <ChevronRight
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className="inline pr-1 cursor-pointer"
                  size={20}
                />
              )}
            </span>
          )}
          <Folder className={`inline pr-1 ${folder?.folders?.length === 0 ? 'ml-5' : ''}`} color="#f5b301" size={20} />
        </>
      ) : (
        <File className="inline pr-1 ml-5 text-gray-700" color="#6b7280" size={20} />
      )}
      {folder.name}
      {isExpanded &&
        folder?.folders?.map((folder: any) => {
          return <MyFolder key={folder.name} folder={folder} />;
        })}
    </div>
  );
}

export default MyFolder;
