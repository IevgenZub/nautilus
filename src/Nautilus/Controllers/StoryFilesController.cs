﻿using System;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Tesseract;

namespace FileUploadAngular5WithAsp.NetCore.Controllers
{
	[Produces("application/json")]
	public class StoryFilesController : Controller
	{
		private IWebHostEnvironment _hostingEnvironment;

		public StoryFilesController(IWebHostEnvironment hostingEnvironment)
		{
			_hostingEnvironment = hostingEnvironment;
		}

		[HttpPost("api/story/files"), DisableRequestSizeLimit]
		public ActionResult UploadFile()
		{
			const string folderName = "Upload";
			string result;
			var file = Request.Form.Files[0];
			var webRootPath = _hostingEnvironment.WebRootPath;
			var newPath = Path.Combine(webRootPath, folderName);

			if (file.Length == 0)
			{
				throw new ArgumentOutOfRangeException("File is empty");
			}

			if (!Directory.Exists(newPath))
			{
				Directory.CreateDirectory(newPath);
			}

			var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
			var fullPath = Path.Combine(newPath, fileName);
			using var stream = new FileStream(fullPath, FileMode.Create);
			file.CopyTo(stream);

			using var engine = new TesseractEngine(Path.Combine(webRootPath, "tessdata"), "eng", EngineMode.Default);
			using var img = Pix.LoadFromFile(fullPath);
			var page = engine.Process(img);
			result = page.GetText();

			return Json(new { imageFile = $"{folderName}/{file.FileName}", text = result });
		}
	}
}