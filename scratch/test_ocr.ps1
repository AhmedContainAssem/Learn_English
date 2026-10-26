param([string]$ImagePath, [string]$Lang = "en-US")

Add-Type -AssemblyName System.Drawing
[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null

$fullPath = [System.IO.Path]::GetFullPath($ImagePath)
$asyncOp = [Windows.Storage.StorageFile]::GetFileFromPathAsync($fullPath)
$file = $asyncOp.GetAwaiter().GetResult()

$streamOp = $file.OpenAsync([Windows.Storage.FileAccessMode]::Read)
$stream = $streamOp.GetAwaiter().GetResult()

$decoderOp = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)
$decoder = $decoderOp.GetAwaiter().GetResult()

$bmpOp = $decoder.GetSoftwareBitmapAsync()
$bitmap = $bmpOp.GetAwaiter().GetResult()

$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage([Windows.Globalization.Language]::new($Lang))
$ocrOp = $engine.RecognizeAsync($bitmap)
$result = $ocrOp.GetAwaiter().GetResult()

Write-Output $result.Text
