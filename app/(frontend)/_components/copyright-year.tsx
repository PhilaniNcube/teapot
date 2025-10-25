"use client";
import React from 'react'

const CopyRightYear = () => {

    const date = new Date();
    const year = date.getFullYear();

  return (
    <span>{year}</span>
  )
}

export default CopyRightYear