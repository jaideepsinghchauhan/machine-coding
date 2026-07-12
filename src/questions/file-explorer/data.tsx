import type { IFolder } from "./FileExplorer";

export const folders: IFolder[] = [
  {
    name: "Home",
    folders: [
      {
        name: "Movies",
        folders: [
          {
            name: "Action",
            folders: [
              { name: "2000s", folders: [{ name: "Gladiator.mp4" }] },
              { name: "2010s", folders: [] },
            ],
          },
          { name: "Comedy", folders: [{ name: "2000s", folders: [] }] },
        ],
      },
      { name: "Music", folders: [{ name: "Rock" }, { name: "Classical" }] },
      { name: "Pictures", folders: [] },
      { name: "Documents", folders: [] },
      { name: "password.txt" },
    ],
  },
];
