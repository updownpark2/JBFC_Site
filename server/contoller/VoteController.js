const express = require("express");
const multer = require("multer");
const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const getVoteUserData = (req, res) => {
  let { schedule_id } = req.params;

  let sql = "SELECT * FROM vote WHERE schedule_id = ?;";
  conn.query(sql, schedule_id, function (err, result) {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    res.status(StatusCodes.OK).json(result);
  });
};

const insertVoteUserData = (req, res) => {
  let { schedule_id, nickName, voteResult } = req.body;

  voteResult = JSON.stringify(voteResult);

  let sql = "INSERT INTO vote (schedule_id, voter, voted) VALUE (?,?,?);";
  let value = [schedule_id, nickName, voteResult];

  conn.query(sql, value, function (err, result) {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }

    res.status(StatusCodes.CREATED).end();
  });
};

const deleteVoteUserData = (req, res) => {
  let { schedule_id, nickName } = req.query;

  let sql = "DELETE FROM vote WHERE schedule_id = ? AND voter = ?;";
  let value = [schedule_id, nickName];
  console.log(value);
  conn.query(sql, value, function (err, result) {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).end();
  });
};

module.exports = { getVoteUserData, insertVoteUserData, deleteVoteUserData };
