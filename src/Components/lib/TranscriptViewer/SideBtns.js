import React, { useState, useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import subtitlesExportOptionsList from "slate-transcript-editor/util/export-adapters/subtitles-generator/list.js";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";

function SideBtns({
  handleExport,
  optionalBtns,
  handleSetEditable,
  isEditable,
  isProcessing,
}) {
  const [anchorMenuEl, setAnchorMenuEl] = useState(null);

  // used by MUI export menu
  const handleMenuClose = () => {
    setAnchorMenuEl(null);
  };

  // used by MUI export menu
  const handleMenuClick = (event) => {
    setAnchorMenuEl(event.currentTarget);
  };

  return (
    <div className="side-buttons">
        <Tooltip
          title={
            " Double click on a word to jump to the corresponding point in the media"
          }
        >
          <button color="primary">
            <InfoOutlined />
          </button>
        </Tooltip>

        <Tooltip
          title={` Turn ${
            isEditable ? "off" : "on"
          } edit mode.  You can edit before exporting the transcript.`}
        >
          <button disabled={isProcessing} onClick={handleSetEditable}>
            <CreateOutlinedIcon color={isEditable ? "secondary" : "white"} />
          </button>
        </Tooltip>

        <Tooltip title={"Export options"}>
          <button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
          >
            <SaveAltIcon /> <KeyboardArrowDownIcon />
          </button>
        </Tooltip>
        <Menu
          id="simple-menu"
          anchorEl={anchorMenuEl}
          keepMounted
          open={Boolean(anchorMenuEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} disabled>
            <Link style={{ color: "black" }}>Text Export</Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport({
                type: "text",
                ext: "txt",
                speakers: false,
                timecodes: false,
                isDownload: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary">
              Text (<code>.txt</code>)
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport({
                type: "text",
                ext: "txt",
                speakers: true,
                timecodes: false,
                isDownload: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary">Text (Speakers)</Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport({
                type: "text",
                ext: "txt",
                speakers: false,
                timecodes: true,
                isDownload: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary">Text (Timecodes)</Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport({
                type: "text",
                ext: "txt",
                speakers: true,
                timecodes: true,
                isDownload: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary"> Text (Speakers & Timecodes)</Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport({
                type: "text",
                ext: "txt",
                speakers: true,
                timecodes: true,
                atlasFormat: true,
                isDownload: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary"> Text (Atlas format)</Link>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleExport({
                type: "word",
                ext: "docx",
                speakers: false,
                timecodes: false,
                isDownload: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary">
              {" "}
              Word (<code>.docx</code>)
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport({
                type: "word",
                ext: "docx",
                speakers: true,
                timecodes: false,
                isDownload: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary"> Word (Speakers)</Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport({
                type: "word",
                ext: "docx",
                speakers: false,
                timecodes: true,
                isDownload: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary"> Word (Timecodes)</Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport({
                type: "word",
                ext: "docx",
                speakers: true,
                timecodes: true,
                isDownload: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary"> Word (Speakers & Timecodes)</Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport({
                type: "word",
                ext: "docx",
                speakers: false,
                timecodes: false,
                inlineTimecodes: true,
                hideTitle: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary"> Word (OHMS)</Link>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose} disabled>
            <Link style={{ color: "black" }}>Closed Captions Export</Link>
          </MenuItem>
          {subtitlesExportOptionsList.map(({ type, label, ext }, index) => {
            return (
              <MenuItem
                key={index + label}
                onClick={() => {
                  handleExport({ type, ext, isDownload: true });
                  handleMenuClose();
                }}
              >
                <Link color="primary">
                  {label} (<code>.{ext}</code>)
                </Link>
              </MenuItem>
            );
          })}
          <Divider />
          <MenuItem onClick={handleMenuClose} disabled>
            <Link style={{ color: "black" }}>Developer options</Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport({
                type: "json-slate",
                ext: "json",
                speakers: true,
                timecodes: true,
                isDownload: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary">
              SlateJs (<code>.json</code>)
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport({
                type: "json-digitalpaperedit",
                ext: "json",
                speakers: true,
                timecodes: true,
                isDownload: true,
              });
              handleMenuClose();
            }}
          >
            <Link color="primary">
              DPE (<code>.json</code>)
            </Link>
          </MenuItem>
        </Menu>
      {optionalBtns}
    </div>
  );
}

export default SideBtns;
