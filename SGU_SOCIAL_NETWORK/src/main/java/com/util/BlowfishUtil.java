package com.util;

import org.bouncycastle.crypto.BlockCipher;
import org.bouncycastle.crypto.CipherParameters;
import org.bouncycastle.crypto.engines.BlowfishEngine;
import org.bouncycastle.crypto.modes.CBCBlockCipher;
import org.bouncycastle.crypto.paddings.PaddedBufferedBlockCipher;
import org.bouncycastle.crypto.params.KeyParameter;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

import java.security.Security;
import java.util.Base64;

public class BlowfishUtil {
	// Thêm Bouncy Castle Provider vào môi trường để hỗ trợ Blowfish
	static {
		Security.addProvider(new BouncyCastleProvider());
	}

	// Khóa sử dụng cho Blowfish. Lưu ý rằng việc quản lý khóa là một vấn đề bảo mật
	// quan trọng.
	private static String key = "aesilrhwiuer23423asd";

	// Mã hóa dữ liệu sử dụng Blowfish
	public static String encrypt(String data) throws Exception {
		// Tạo đối tượng BlowfishEngine để sử dụng thuật toán Blowfish
		BlockCipher engine = new BlowfishEngine();

		// Sử dụng chế độ CBC (Cipher Block Chaining) để tăng cường an ninh
		PaddedBufferedBlockCipher cipher = new PaddedBufferedBlockCipher(new CBCBlockCipher(engine));

		// Khởi tạo thông số cho mã hóa với khóa
		CipherParameters keyParam = new KeyParameter(key.getBytes());
		cipher.init(true, keyParam);

		// Chuyển đổi dữ liệu thành mảng byte sử dụng UTF-8
		byte[] input = data.getBytes("UTF-8");

		// Mảng byte để chứa dữ liệu đã mã hóa
		byte[] output = new byte[cipher.getOutputSize(input.length)];

		// Tiến hành mã hóa dữ liệu
		int len = cipher.processBytes(input, 0, input.length, output, 0);
		len += cipher.doFinal(output, len);

		// Chuyển đổi mảng byte thành chuỗi Base64 để lưu trữ hoặc truyền đi
		return Base64.getEncoder().encodeToString(output);
	}

	// Giải mã dữ liệu sử dụng Blowfish
	public static String decrypt(String encryptedData) throws Exception {
		// Tạo đối tượng BlowfishEngine để sử dụng thuật toán Blowfish
		BlockCipher engine = new BlowfishEngine();

		// Sử dụng chế độ CBC (Cipher Block Chaining) để tăng cường an ninh
		PaddedBufferedBlockCipher cipher = new PaddedBufferedBlockCipher(new CBCBlockCipher(engine));

		// Khởi tạo thông số cho giải mã với khóa
		CipherParameters keyParam = new KeyParameter(key.getBytes());
		cipher.init(false, keyParam);

		// Chuyển đổi chuỗi Base64 về mảng byte
		byte[] input = Base64.getDecoder().decode(encryptedData);

		// Mảng byte để chứa dữ liệu đã giải mã
		byte[] output = new byte[cipher.getOutputSize(input.length)];

		// Tiến hành giải mã dữ liệu
		int len = cipher.processBytes(input, 0, input.length, output, 0);
		len += cipher.doFinal(output, len);

		// Chuyển đổi mảng byte thành chuỗi sử dụng UTF-8
		return new String(output, 0, len, "UTF-8");
	}
}
